import Image from 'next/image';

function Header() {
  return (
    <div className="py-5 flex justify-between shadow-lg px-5 bg-gray-100">
      <Image
        src={`https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png`}
        width={50}
        height={50}
        alt="META LOGO"
        className="object-contain"
      />
      <button className="bg-blue-500 text-white text-center rounded-lg hover:shadow-lg py-2 px-3">
        Logout
      </button>
    </div>
  );
}

export default Header;
