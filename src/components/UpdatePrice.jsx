import { useState } from "react";
import { putNewPrice } from "../utils/api";

const UpdatePrice = ({
  setPrice,
  setPriceMessage,
  station_id,
  setTimeSubmitted,
  setPriceClicked,
}) => {
  const [newPrice, setNewPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //optimistic rendering that only accepts a price format of 123.4 for example and not 123.4.5 or 4564322 etc
    const isValid = /^\d\d\d\.\d$/.test(newPrice);
    if (!isValid) {
      setNewPrice("");
      setPriceMessage("please enter price in pence, ie. 198.9");
    }
    if (isValid) {
      setPrice(newPrice);
      setPriceMessage("Thanks for submitting your price!");
      setPriceClicked("submitted")
      setTimeSubmitted(new Date().toLocaleString())

      //CHANGE TO ADD REAL USER
      putNewPrice(station_id, newPrice, "guestuser");
    }

    // catch error to reverse price if post fails
    // setNewPrice("")
  };
  return (
    <div className="updatePriceForm">
      <form onSubmit={handleSubmit}>
        <label id="price-label">
          <input className="SubmitPriceForm"
            type="number"
            id="price-input"
            name="new-price"
            placeholder="New price"
            value={newPrice}
            step="any"
            onChange={(event) => setNewPrice(event.target.value)}
          />
        </label>
        <button className="UpdatePriceButton" type="submit">submit</button>
      </form>
    </div>
  );
};

export default UpdatePrice;
