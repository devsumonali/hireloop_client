import Link from 'next/link';

const Navbar = () => {
     return (
          <div>
               <ul>
                    <li>
                         <Link href={'/login'}>login</Link>
                    </li>
                    <li>
                         <Link href={'/registration'}>Registration</Link>
                    </li>
               </ul>
          </div>
     );
};

export default Navbar;
