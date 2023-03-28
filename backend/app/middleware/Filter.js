const Filter = (req, res, next) => {
    // LIMIT, SKIP
    let limit = +req.query.limit || 0;
    let skip = ((+req.query.page || 1) - 1) * +limit;

    // SORT
    if (req.query.sort && req.query.sort !== 'default') {
        switch (req.query.sort) {
            case 'name':
                res.locals.sort = { name: 1 };
                break;
            case 'name:desc':
                res.locals.sort = { name: -1 };
                break;
            case 'price':
                res.locals.sort = { price: 1 };
                break;
            case 'price:desc':
                res.locals.sort = { price: -1 };
                break;
        }
    } else res.locals.sort = { _id: -1 };

    // FILTER
    const filter = {};
    // page
    // filter.page = +req.query.page;

    //type, category
    if (req.query.type) filter.type = req.query.type;
    if (req.query.category) filter.category = req.query.category;

    // price
    if (req.query.price) {
        const price = req.query.price.split(':').map((price) => +price);
        limit = {};
        if (price.length === 2)
            filter.price = { $gte: price[0], $lte: price[1] };
        else if (price[0] > 0) filter.price = { $gte: price[0] };
        else limit = +req.query.limit || 8;

        if (!req.query.sort || req.query.sort === 'default')
            res.locals.sort = { _id: -1 };
    }
    //set res.locas
    res.locals.filter = filter;

    res.locals.limit = limit;
    res.locals.skip = skip;
    next();
};

export default Filter;
