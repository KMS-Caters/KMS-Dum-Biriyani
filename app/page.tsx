"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const MapPicker = dynamic(
  () => import("@/components/MapPicker"),
                          {
                            ssr: false,
                          }
);
export default function Home() {
  const [customerName, setCustomerName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [chickenDumQty, setChickenDumQty] = useState(0);
  const [muttonDumQty, setMuttonDumQty] = useState(0);

  const [chicken65Size, setChicken65Size] = useState("");

  const [pineappleKesariQty, setPineappleKesariQty] = useState(0);

  const chicken65Prices: Record<string, number> = {
    "100g": 70,
    "150g": 100,
    "250g": 150,
    "500g": 300,
    "1kg": 600,
  };

  const total =
  chickenDumQty * 270 +
  muttonDumQty * 370 +
  pineappleKesariQty * 30 +
  (chicken65Prices[chicken65Size] || 0);



  const [deliveryDate, setDeliveryDate] = useState("");

  const [deliveryTime, setDeliveryTime] = useState("");

  const [latitude, setLatitude] = useState<number | null>(null);

  const [longitude, setLongitude] = useState<number | null>(null);

  const [showMap, setShowMap] = useState(false);

  const [locationStatus, setLocationStatus] = useState("");

  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [paymentMode, setPaymentMode] = useState("online");

  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);

  function validateForm() {
    if (!/^[A-Za-z.\s]+$/.test(customerName)) {
      alert("Name can contain only letters, spaces and dots.");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      alert("Please enter a valid Indian mobile number.");
      return false;
    }


    if (
      chickenDumQty === 0 &&
      muttonDumQty === 0 &&
      pineappleKesariQty === 0 &&
      !chicken65Size
    ) {
      alert("Please select at least one item.");
      return false;
    }

    if (!latitude || !longitude) {
      alert("Please select a delivery location on the map.");
      return false;
    }

    if (!deliveryDate) {
      alert("Please select a delivery date.");
      return false;
    }

    if (!deliveryTime) {
      alert("Please select a delivery time.");
      return false;
    }

    if (!deliveryAddress.trim()) {
      alert("Please provide a delivery address.");
      return false;
    }


    return true;
  }


  return(

    <main className="min-h-screen bg-zinc-950 text-white py-8 px-4">
    <div className="max-w-2xl mx-auto bg-zinc-900 p-8 rounded-2xl shadow-xl">



    <h1 className="text-4xl font-bold mb-8 text-center">
    KMS Orders
    </h1>

    <h2 className="text-xl font-bold mb-4">
    Customer Details
    </h2>


    <input
    type="text"
    placeholder="Customer Name"
    value={customerName}
    onChange={(e) => {
      const value = e.target.value.replace(/[^A-Za-z.\s]/g, "");
      setCustomerName(value);
    }}
    className="w-full p-3 rounded bg-zinc-800 mb-4 border-1"
    />

    <input
    type="text"
    placeholder="Mobile Number"
    value={phoneNumber}
    maxLength={10}
    onChange={(e) => {
      let value = e.target.value.replace(/\D/g, "");

      if (value.startsWith("91") && value.length > 10) {
        value = value.slice(2);
      }

      value = value.slice(0, 10);

      setPhoneNumber(value);
    }}
    className="w-full p-3 rounded bg-zinc-800 border-1"
    />

    <hr className="border-zinc-700 mt-4" />



    <h2 className="text-xl font-bold mt-4 mb-4">
    Menu
    </h2>

    <div>
    <label className="block mb-2 font-semibold">
    Chicken Dum Biryani — ₹270 each
    </label>

    <input
    type="number"
    min="0"
    value={chickenDumQty}
    onChange={(e) =>
      setChickenDumQty(Number(e.target.value))
    }
    className="w-full p-3 rounded bg-zinc-800 border-1"
    />
    </div>

    <div className="mt-4">
    <label className="block mb-2 font-semibold  ">
    Mutton Dum Biryani — ₹370 each
    </label>

    <input
    type="number"
    min="0"
    value={muttonDumQty}
    onChange={(e) =>
      setMuttonDumQty(Number(e.target.value))
    }
    className="w-full p-3 rounded bg-zinc-800 border-1"
    />
    </div>

    <div className="mt-4">
    <label className="block mb-2 font-semibold">
    Chicken 65 Qty
    </label>

    <select
    value={chicken65Size}
    onChange={(e) =>
      setChicken65Size(e.target.value)
    }
    className="w-full p-3 rounded bg-zinc-800 border-1"
    >
    <option value="">Select Size</option>
    <option value="100g">100g - ₹70</option>
    <option value="150g">150g - ₹100</option>
    <option value="250g">250g - ₹150</option>
    <option value="500g">500g - ₹300</option>
    <option value="1kg">1kg - ₹600</option>
    </select>
    </div>




    <div className="mt-4">
    <label className="block mb-2 font-semibold">
    Pineapple Kesari — ₹30 each
    </label>

    <input
    type="number"
    min="0"
    value={pineappleKesariQty}
    onChange={(e) =>
      setPineappleKesariQty(Number(e.target.value))
    }
    className="w-full p-3 rounded bg-zinc-800 border-1"
    />
    </div>




     <hr className="border-zinc-700 mt-4" />


    <h2 className="text-xl font-bold mt-4 mb-2">
    Delivery Details
    </h2>

    <div className="grid grid-cols-2 gap-4">
    <div>
    <label className="block mb-2 font-semibold">
    Date
    </label>

    <input
    type="date"
    value={deliveryDate}
    onChange={(e) =>
      setDeliveryDate(e.target.value)
    }
    className="w-full p-3 rounded bg-zinc-800 border-1"
    />
    </div>

    <div>
    <label className="block mb-2 font-semibold">
    Time
    </label>

    <input
    type="time"
    value={deliveryTime}
    onChange={(e) =>
      setDeliveryTime(e.target.value)
    }
    className="w-full p-3 rounded bg-zinc-800 border-1"
    />
    </div>
    </div>

    <div>
    <label className="block mb-2 font-semibold mt-4">
    Delivery Address
    </label>

    <textarea
    placeholder="House No, Street, Landmark..."
    value={deliveryAddress}
    onChange={(e) =>
      setDeliveryAddress(e.target.value)
    }
    className="w-full p-3 rounded bg-zinc-800"
    rows={3}
    />

    <p className="text-xs text-zinc-400 mt-1">
    GPS may detect a nearby address. Please verify and edit if needed.
    </p>
    </div>


    <button
    type="button"
    onClick={() => setShowMap(!showMap)}
    className="bg-purple-600 px-4 py-2 rounded-lg mt-2 ml-2 mb-4"
    >
     Select Delivery Location
    </button>


    {showMap && (
      <div className="mt-4 rounded-xl overflow-hidden">
      <MapPicker
      onConfirm={(lat, lng, address) => {
        setLatitude(lat);
        setLongitude(lng);

        setDeliveryAddress(address);

        setLocationStatus(
          `✅ Location confirmed: ${address}`
        );

        setShowMap(false);
      }}
      />
      </div>
    )}

    {locationStatus && (
      <p className="text-green-400">
      {locationStatus}
      </p>
    )}

    <hr className="border-zinc-700" />

    <h2 className="text-xl font-bold mt-4 mb-4">
    Payment
    </h2 >

    <select
    value={paymentMode}
    onChange={(e) =>
      setPaymentMode(e.target.value)
    }
    className="w-full p-3 rounded bg-zinc-800 mb-4"
    >
    <option value="online">Online</option>
    <option value="cash">Cash</option>
    <option value="paylater">Pay Later</option>
    </select>

    <textarea
    placeholder="Additional Notes"
    value={notes}
    onChange={(e) =>
      setNotes(e.target.value)
    }
    className="w-full p-3 rounded bg-zinc-800 mb-3"
    rows={3}
    />

    <div className="bg-zinc-800 rounded-xl p-4 text-center">
    <p className="text-zinc-400 ">
    Total Amount
    </p>

    <h2 className="text-3xl font-bold text-green-400">
    ₹{total}
    </h2>
    </div>
    <button
    type="button"
    disabled={loading}
    onClick={async () => {
      if (!validateForm()) return;

      setLoading(true);

      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName,
            phoneNumber,

            chickenDumQty,
            muttonDumQty,

            chicken65Size,

            pineappleKesariQty,

            deliveryDate,
            deliveryTime,

            deliveryAddress,

            latitude,
            longitude,

            paymentMode,

            notes,

            totalAmount: total,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to place order");
        }

        alert("Order placed successfully ✅");

        window.location.reload();
      } catch (error) {
        console.error(error);

        alert("Failed to place order ❌");
      } finally {
        setLoading(false);
      }
    }}
    className={`w-full py-4 rounded-xl text-lg font-bold transition mt-4 ${
      loading
      ? "bg-zinc-600 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
    }`}
    >
    {loading ? "Placing Order..." : "Place Order"}
    </button>



    </div>

  </main>


  );
}
