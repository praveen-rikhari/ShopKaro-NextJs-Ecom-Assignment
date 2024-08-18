import Image from "next/image";
import Link from "next/link";
import { HiShoppingBag } from "react-icons/hi2";
import "./Payment.css"

function Payment() {
  return (
    <div className="payment-page">
      <h2 className="payment-header
      ">
        Thank You, Payment Confirmed !!!
      </h2>

      <div >
        <Image
          src='/pc.png'
          width={500}
          height={150}
          alt="Payment confirm"
          className='confirm-img'
        />
      </div>

      <Link href="/" className="redirect">
        <button classname="continue-btn">
          Continue Shopping <HiShoppingBag size={20} />
        </button>
      </Link>
    </div>
  )
}

export default Payment