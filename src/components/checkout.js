import React, { useState, useEffect, useRef } from "react"
import { loadStripe } from "@stripe/stripe-js"

const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#000",
  padding: "12px 60px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
}

const buttonDisabledStyles = {
  opacity: "0.5",
  cursor: "not-allowed",
}

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_gVjL0LxJVbCrlfkEHJyhaRuw00POknobK6")
  }
  return stripePromise
}

const Checkout = () => {
  const [loading, setLoading] = useState(false)

  const [qty, setQty] = useState(1)
  const shipping = useRef("price_1KMhuOIgbSxtTtnZ8NtN7YPa")

  const [addrtype, setAddrtype] = useState(["1", "2", "3"])
  const Add = addrtype.map(Add => Add)
  const handleAddrTypeChange = e => {
    let quantity = Number(addrtype[e.target.value]);
    setQty(quantity)
  }

  useEffect(() => {
    if (qty > 2) {
      shipping.current = "price_1KMhtzIgbSxtTtnZgveswlYU";
    } else {
      shipping.current = "price_1KMhuOIgbSxtTtnZ8NtN7YPa";
    }
  }, [qty])

  const redirectToCheckout = async event => {
    event.preventDefault()
    setLoading(true)

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [
        { price: "price_1KMeeUIgbSxtTtnZBo9uQB4N", quantity: qty },
        { price: shipping.current, quantity: 1 },
      ],
      shippingAddressCollection: { allowedCountries: ["FR"] },
      billingAddressCollection: "required",
      successUrl: `http://localhost:8000/page-2/`,
      cancelUrl: `http://localhost:8000/`,
    })

    if (error) {
      console.warn("Error:", error)
      setLoading(false)
    }
  }

  return (
    <div>
      <select
        onChange={e => handleAddrTypeChange(e)}
        className="browser-default custom-select"
      >
        {Add.map((address, key) => (
          <option key={key} value={key}>
            {address}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="bg-indigo-500 hover:bg-indigo-300 text-lg text-white rounded-full px-4 py-2"
        onClick={redirectToCheckout}
      >
        Acheter l'affiche
      </button>
    </div>
  )
}

export default Checkout