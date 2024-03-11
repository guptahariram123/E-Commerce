import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../Store/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../Store/ActionCreators/MainCategoryActionCreators'
import { getSubcategory } from '../Store/ActionCreators/SubCategoryActionCreators'
import { getBrand } from '../Store/ActionCreators/BrandActionCreators'
import { Link, useParams } from 'react-router-dom'


export default function Shop() {
    var [flag, setFlag] = useState('false')
    var [product, setProduct] = useState([])
    var [priceFilter, setPriceFilter] = useState('none')
    var dispatch = useDispatch()
    var allProducts = useSelector((state) => state.ProductStateData)
    var allMaincategories = useSelector((state) => state.MaincategoryStateData)
    var allSubcategories = useSelector((state) => state.SubcategoryStateData)
    var allBrands = useSelector((state) => state.BrandStateData)
    var { maincat, subcat, brnd } = useParams()
    var [mc, setMc] = useState("All")
    var [sc, setSc] = useState("All")
    var [br, setBr] = useState("All")
    function filterData(mc, sc, br,priceFilter) {
        if (priceFilter === "none") {
            if (mc === 'All' && sc === 'All' && br === 'All')
                setProduct(allProducts.slice(1))
            else if (mc !== 'All' && sc === 'All' && br === 'All')
                setProduct(allProducts.slice(1).filter((x) => x.maincategory == mc))
            else if (mc === 'All' && sc !== 'All' && br === 'All')
                setProduct(allProducts.slice(1).filter((x) => x.subcategory == sc))
            else if (mc === 'All' && sc === 'All' && br !== 'All')
                setProduct(allProducts.slice(1).filter((x) => x.brand == br))
            else if (mc !== 'All' && sc !== 'All' && br === 'All')
                setProduct(allProducts.slice(1).filter((x) => x.maincategory == mc && x.subcategory == sc))
            else if (mc !== 'All' && sc === 'All' && br !== 'All')
                setProduct(allProducts.slice(1).filter((x) => x.maincategory == mc && x.brand == br))
            else if (mc === 'All' && sc !== 'All' && br !== 'All')
                setProduct(allProducts.slice(1).filter((x) => x.subcategory == sc && x.brand == br))
            else
                setProduct(allProducts.slice(1).filter((x) => x.maincategory == mc && x.subcategory == sc && x.brand == br))
        }
        else{
            var min=0
            var max=0
            if(priceFilter==='first'){
                min=0
                max=1000
            }
            else if(priceFilter==='second'){
                min=1001
                max=2000
            }
            else if(priceFilter==='third'){
                min=2001
                max=3000
            }
            else if(priceFilter==='fourth'){
                min=3001
                max=4000
            }
            else if(priceFilter==='fifth'){
                min=4001
                max=5000
            }
            else {
                min=5001
                max=2000000000000
            }
            if (mc === 'All' && sc === 'All' && br === 'All')
                setProduct(allProducts.slice(1).filter(x=>x.finalprice>=min && x.finalprice<=max))
            else if (mc !== 'All' && sc === 'All' && br === 'All')
                setProduct(allProducts.slice(1).filter((x) => x.maincategory == mc && x.finalprice>=min && x.finalprice<=max))
            else if (mc === 'All' && sc !== 'All' && br === 'All')
                setProduct(allProducts.slice(1).filter((x) => x.subcategory == sc && x.finalprice>=min && x.finalprice<=max))
            else if (mc === 'All' && sc === 'All' && br !== 'All')
                setProduct(allProducts.slice(1).filter((x) => x.brand == br  && x.finalprice>=min && x.finalprice<=max))
            else if (mc !== 'All' && sc !== 'All' && br === 'All')
                setProduct(allProducts.slice(1).filter((x) => x.maincategory == mc && x.subcategory == sc && x.finalprice>=min && x.finalprice<=max))
            else if (mc !== 'All' && sc === 'All' && br !== 'All')
                setProduct(allProducts.slice(1).filter((x) => x.maincategory == mc && x.brand == br && x.finalprice>=min && x.finalprice<=max))
            else if (mc === 'All' && sc !== 'All' && br !== 'All')
                setProduct(allProducts.slice(1).filter((x) => x.subcategory == sc && x.brand == br && x.finalprice>=min && x.finalprice<=max))
            else
                setProduct(allProducts.slice(1).filter((x) => x.maincategory == mc && x.subcategory == sc && x.brand == br && x.finalprice>=min && x.finalprice<=max))
        }

    }
    function getSelected(x, y, z) {
        setMc(x)
        setSc(y)
        setBr(z)
        filterData(x, y, z,priceFilter)
    }
    function sortBy(input) {
        if (input === "Newest")
            product.sort((x, y) => y.id - x.id)
        else if (input === "HTOL")
            product.sort((x, y) => y.finalprice - x.finalprice)
        else
            product.sort((x, y) => x.finalprice - y.finalprice)

        setProduct(product)
        setFlag(!flag)
    }
    function getInputData(e) {
        setPriceFilter(e.target.value)
        filterData(mc, sc, br,e.target.value)

    }
    function getAPIData() {
        dispatch(getProduct())
        dispatch(getMaincategory())
        dispatch(getSubcategory())
        dispatch(getBrand())
        if (allProducts.length)
            filterData(maincat, subcat, brnd,priceFilter)
    }
    useEffect(() => {
        getAPIData()
    }, [allMaincategories.length, allSubcategories.length, allBrands.length, allProducts.length])
    return (
        <>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                            <span className="breadcrumb-item active">Shop </span>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-3 col-md-4">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by price</span></h5>
                        <div className="bg-light p-4 mb-30">
                            <select name="price" onChange={getInputData} className='form-control'>
                                <option value="none">Choose A Range</option>
                                <option value="first">&#8377;0- &#8377;1000</option>
                                <option value="second">&#8377;1001- &#8377;2000</option>
                                <option value="third">&#8377;2001- &#8377;3000</option>
                                <option value="fourth">&#8377;3001- &#8377;4000</option>
                                <option value="fifth">&#8377;4001- &#8377;5000</option>
                                <option value="sixth">&gt; &#8377;5000</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8">
                        <div className="row pb-3">
                            <div className="col-12 pb-1">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Maincategory</button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <button className="dropdown-item" onClick={() => getSelected('All', sc, br)}>All</button>
                                                {
                                                    allMaincategories.slice(1).map((item, index) => {
                                                        return <button key={index} onClick={() => getSelected(item.name, sc, br)} className="dropdown-item" >{item.name}</button>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Subcategory</button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <button className="dropdown-item" onClick={() => getSelected(mc, 'All', br)} >All</button>
                                                {
                                                    allSubcategories.slice(1).map((item, index) => {
                                                        return <button key={index} onClick={() => getSelected(mc, item.name, br)} className="dropdown-item" >{item.name}</button>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Brand</button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <button className="dropdown-item" onClick={() => getSelected(mc, sc, 'All')}>All</button>
                                                {
                                                    allBrands.slice(1).map((item, index) => {
                                                        return <button key={index} onClick={() => getSelected(mc, sc, item.name)} className="dropdown-item" >{item.name}</button>
                                                    })
                                                }
                                            </div>
                                        </div>

                                    </div>
                                    <div className="ml-2">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <button className="dropdown-item" onClick={() => sortBy("Newest")}>Latest</button>
                                                <button className="dropdown-item" onClick={() => sortBy("LTOH")}>Price : Low To High</button>
                                                <button className="dropdown-item" onClick={() => sortBy("HTOL")}>Price : High To Low</button>
                                            </div>
                                        </div>
                                        {/* <div className="btn-group ml-2">
                                            <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Showing</button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <button className="dropdown-item" >10</button>
                                                <button className="dropdown-item" >20</button>
                                                <button className="dropdown-item" >30</button>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            {
                                product.map((item, index) => {
                                    return <div key={index} className="col-lg-4 col-md-6 col-sm-6 pb-1">
                                        <div className="product-item bg-light mb-4">
                                            <div className="product-img position-relative overflow-hidden">
                                                <img className="img-fluid w-100" src={`/assets/images/${item.pic1}`} style={{ height: "200px", width: "100%" }} alt="" />
                                                <div className="product-action">
                                                    <Link className="btn btn-outline-dark btn-square w-100" to={`/single-product/${item.id}`}>View</Link>
                                                </div>
                                            </div>
                                            <div className="text-center py-4">
                                                <Link className="h6 text-decoration-none text-truncate" to={`/assets/images/${item.pic1}`}>{item.name}</Link>
                                                <div className="d-flex align-items-center justify-content-center mt-2">
                                                    <h5>&#8377;{item.finalprice}</h5><h6 className="text-muted ml-2"><del>&#8377;{item.baseprice}</del><sup>{item.discount} % off</sup></h6>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                })
                            }

                            {/* <div className="col-12">
                                <nav>
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item disabled"><Link className="page-link" to="#">Previous</Link></li>
                                        <li className="page-item active"><Link className="page-link" to="#">1</Link></li>
                                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                        <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                                    </ul>
                                </nav>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div >


        </>
    )
}
