import {useEffect, useState} from "react";
import './style.css'

const RestaurantMenu = (props) => {
    const [menus, setMenus] = useState([]);
    const [order, setOrder] = useState({});

    useEffect(() => {
        fetchMenus(props.restaurantId);
    }, []);

    const fetchMenus = (id) => {
        fetch('https://food-delivery-api.dev.io-academy.uk/restaurants/' + id)
            .then(response => response.json())
            .then(data => {
                setMenus(data.foodItems);
            });
    };

    //First checks if foodItem exists in the array and is >= 0 and is valid for subtraction
    //It then creates a temporary copy of the order array as prevOrder
    //It then updates the item corresponding to foodItem with the quantity variable
    const updateOrder = (foodItem, quantity) => {
        if(!(quantity < 0 && (order[foodItem] === 0 || order[foodItem] === undefined))){
            setOrder(prevOrder => ({
                ...prevOrder,
                [foodItem]: (prevOrder[foodItem] || 0) + quantity
            }));
        }
    };

    const displayMenu = (item) => {
        return (
            <div className='menuItem' key={item.foodName}>
                <h3 className='name'>{item.foodName}</h3>
                <div className='info'>
                    <p className='calories'>Calories: {item.calories}</p>
                    {item.foodType && <p className='type'>Food Type: {item.foodType}</p>}
                    {item.sideItem && <p className='isSide'>Side</p>}
                    {item.breakfastItem && <p className='isBreakfast'>Breakfast</p>}
                </div>
                <div className='bottom'>
                    <p className='price'>£{item.price}</p>
                    <div className='buttonsAndQuantity'>
                        <button className='button' onClick={() => updateOrder(item.foodName, 1)}>+</button>
                        <p>{order[item.foodName] || 0}</p>
                        <button className='button' onClick={() => updateOrder(item.foodName, -1)}>-</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {menus.map(displayMenu)}
        </>
    );
};

export default RestaurantMenu;