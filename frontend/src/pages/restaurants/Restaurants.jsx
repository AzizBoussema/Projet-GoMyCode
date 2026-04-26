import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../JS/actions/restaurant.actions";
import { Link } from "react-router-dom";
import "./restaurants.css";

const Restaurants = () => {
  const dispatch = useDispatch();
  const { restaurants, isLoad } = useSelector((state) => state.restaurantReducer);

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  if (isLoad) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="restaurants-header text-center mb-5">
        <h1 className="fw-bold">Nos Restaurants Partenaires</h1>
        <p className="text-muted">Choisissez votre restaurant préféré et découvrez son menu exclusif.</p>
      </div>

      <div className="row">
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant._id} className="col-md-4 mb-4">
              <Link to={`/restaurants/${restaurant._id}`} className="text-decoration-none">
                <div className="card h-100 restaurant-card shadow-sm border-0">
                  <img
                    src={restaurant.image}
                    className="card-img-top restaurant-img"
                    alt={restaurant.name}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title fw-bold text-dark m-0">{restaurant.name}</h5>
                      <span className="badge bg-warning text-dark"><i className="fa fa-star me-1"></i>{restaurant.rating}</span>
                    </div>
                    <p className="card-text text-secondary mb-3">{restaurant.description?.slice(0, 80)}...</p>
                    <div className="d-flex justify-content-between text-muted small">
                      <span><i className="fa fa-clock-o me-1"></i> {restaurant.deliveryTime}</span>
                      <span><i className="fa fa-map-marker me-1"></i> {restaurant.address}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <h4>Aucun restaurant disponible pour le moment.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
