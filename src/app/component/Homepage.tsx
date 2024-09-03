import Link from "next/link";



const Homepage= () => {

  return (
    <div className="p-4 border-2 border-green-400">
      <h1>Fetch the data</h1>
     <Link href={'home'}>GO to Home</Link>
    </div>
  );
};

export default Homepage;
