import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../JS/actions/product.actions";
import "./addFood.css";

const AddFoodItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    status: "published",
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProduct(
        {
          ...productData,
          price: parseFloat(productData.price),
        },
        navigate
      )
    );
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>Ajouter un nouveau produit</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description *
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={productData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Prix *
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    step="0.01"
                    min="0"
                    value={productData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Categorie
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    URL de l'image
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="image"
                    name="image"
                    value={productData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Statut
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={productData.status}
                    onChange={handleChange}
                  >
                    <option value="published">Publie</option>
                    <option value="unpublished">Non publie</option>
                  </select>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    Ajouter le produit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/vendor/dashboard")}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFoodItem;
