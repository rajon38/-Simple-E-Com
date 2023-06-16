import { Badge } from "antd";
import React from 'react';
import {useCart} from "../context/cart";
import {useNavigate} from "react-router-dom";

const ProductCard = ({p}) => {
    // hooks
    const navigate = useNavigate();
    return (
        <div className="card w-96 glass">
            <Badge.Ribbon text={`${p?.sold} sold`} color="red">
                <Badge.Ribbon
                    text={`${p?.quantity >= 1
                        ? `${p?.quantity - p?.sold} in stock`
                        : "Out of stock"
                    }`}
                    placement="start"
                    color="green"
                >
            <a className="block relative h-48 rounded overflow-hidden"><img className="object-contain object-center w-full h-full block" src={`${process.env.REACT_APP_API}/product/photo/${p._id}`} alt={p.name}/></a>
                </Badge.Ribbon>
            </Badge.Ribbon>
            <div className="card-body">
                <h2 className="card-title">{p?.name}</h2>
                <h2>{p?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}</h2>
                <p>{p?.description?.substring(0, 60)}...</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>View Product</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;