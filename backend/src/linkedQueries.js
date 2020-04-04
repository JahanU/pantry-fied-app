const parseTableData = (keyModel, midModel, returnModel) => {
    const midTable = midModel.getTableName();
    const returnTable = returnModel.getTableName();

    const keyMidCol = keyModel.getTableName().slice(0, -1);
    const retMidCol = returnTable.slice(0, -1);

    return { midTable, returnTable, keyMidCol, retMidCol };
};

export const linkedQueryId = ({ keyModel, midModel, returnModel, id }) => {
    const { midTable, returnTable, keyMidCol, retMidCol } = parseTableData(keyModel, midModel, returnModel);

    if (id instanceof Array) {
        return returnModel.sequelize.query(
            // eslint-disable-next-line max-len
            `SELECT DISTINCT u.* FROM ${returnTable} as u JOIN ${midTable} as m on m.${retMidCol}_id = u.id WHERE m.${keyMidCol}_id in (:id)`,
            {
                replacements: { id },
                model: returnModel,
                raw: true,
            },
        );
    }

    return returnModel.sequelize.query(
        `SELECT u.* FROM ${returnTable} as u JOIN ${midTable} as m on m.${retMidCol}_id = u.id WHERE m.${keyMidCol}_id = :id`,
        {
            replacements: { id },
            model: returnModel,
            raw: true,
        },
    );
};

// eslint-disable-next-line object-curly-newline
export const linkedQuery = ({ keyModel, keyWhere, midModel, midWhere, returnModel, returnWhere, findOne }) => {
    // prettier-ignore
    const linkInclude = midModel
        ? [{
            model: midModel,
            include: [
                {
                    model: keyModel,
                    where: keyWhere,
                },
            ],
            where: midWhere,
            required: true,
        }] : [{
            model: keyModel,
            where: keyWhere,
        }];

    const seqQuery = { include: linkInclude, raw: true };

    if (returnWhere) seqQuery.where = returnWhere;

    return findOne ? returnModel.findOne(seqQuery) : returnModel.findAll(seqQuery);
};
