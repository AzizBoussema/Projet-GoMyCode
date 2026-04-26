import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getOneProduct } from "../../JS/actions/product.actions";
import { addToCart } from "../../JS/actions/cart.actions";
import "./foodDetails.css";

const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoad } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product, 1));
    alert("Produit ajoute au panier.");
  };

  if (isLoad) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  if (!product?._id) {
    return <div className="text-center mt-5">Produit non trouve</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image || "https://via.placeholder.com/500x400"}
            className="img-fluid rounded"
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="text-muted">
            Restaurant: {product.restaurantId?.businessName || product.restaurantId?.name}
          </p>
          <p className="lead">{product.description}</p>
          <h3 className="text-success">{product.price} EUR</h3>
          <div className="mt-4">
            <button
              className="btn btn-success btn-lg me-3"
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </button>
            <Link to="/cart" className="btn btn-outline-primary btn-lg">
              Voir le panier
            </Link>
          </div>
          <div className="mt-3">
            <Link to="/products" className="btn btn-secondary">
              Retour au catalogue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
