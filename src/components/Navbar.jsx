import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { motion, AnimatePresence } from "framer-motion"

const generateLink = (i) => {
  switch (i) {
    case 0: return '/';
    case 1: return '/projects';
    case 2: return '/contact';
    default: return '/';
  }
};

const MenuItems = ({ isMobile, active, setActive, setIsOpen, inputs}) => {
  
  return (
    <ul className={`list-none flexCenter flex-row  ${isMobile && 'flex-col h-full'}`}>
      {/* for the map i is the index */}
      {['.about()', '.projects()', '.contact()'].map((item, i) => (
        isMobile && (
          <motion.li key={i}
            onClick={() => {
              setActive(item);
              setIsOpen(false);
              inputs.value = !inputs.value
            }}>
            <Link className='text-3xl p-4' href={generateLink(i)}>{item}</Link>
          </motion.li>
        )
        
      ))}
    </ul>
  );
};





const checkActive = (active, setActive, router) => {
  switch (router.pathname) {
    case '/':
      if (active !== '.about()') setActive('.about()');
      break;
    case '/projects':
      if (active !== '.projects()') setActive('.projects()');
      break;
    case '/contact':
      if (active !== '.contact()') setActive('.contact()');
      break;
    default:
      setActive('.err(404)');
  }
};

const Navbar = () => {
  const router = useRouter();
  const [active, setActive] = useState('.about()');
  const [isOpen, setIsOpen] = useState(false);
  const { rive, RiveComponent } = useRive({
    src: "rive/menu_button.riv",
    stateMachines: "switch",
    autoplay: true,
  });
  const bumpInput = useStateMachineInput(rive, "switch", "toggleX");
  useEffect(() => {
    checkActive(active, setActive, router);
  }, [router.pathname]);
  const { rive:rive4, RiveComponent:About } = useRive({
    src: "rive/electrified_button.riv",
    artboard:"about",
    stateMachines: "button",
    autoplay: true,
  });
  const { rive:rive1, RiveComponent:Project } = useRive({
    src: "rive/electrified_button.riv",
    artboard:"project",
    stateMachines: "button",
    autoplay: true,
  });
  const { rive:rive2, RiveComponent:Contact } = useRive({
    src: "rive/electrified_button.riv",
    artboard:"contact",
    stateMachines: "button",
    autoplay: true,
  }); 
  return (
    /* for the nagivation bar */
    <nav className="fixed z-50 w-full h-20 bg-black bg-opacity-70 flexCenter md:justify-end ">
      <div className='flex flex-row w-2/3 md:hidden flexBetween'>
        <div className="flex flex-row justify-start flex-1">
          <div className="flexCenter ">
            <p className="ml-1 text-4xl font-bold text-purple-700">{active}</p>
          </div>
        </div>
        {/* this is the div for the large screen  */}
        <div className="flex flex-row justify-end flex-initial items-center">
          <div className="flex">
            <motion.li className='h-20 w-40'>
              <Link className='h-20 w-40 flex' href={generateLink(0)}><div className='h-20 w-44'><About /></div ></Link>
            </motion.li>
            <motion.li className='h-20 w-40'>
              <Link className='h-20 w-40 flex' href={generateLink(1)}><div className='h-20 w-44'><Project /></div ></Link>
            </motion.li>
            <motion.li  className='h-20 w-40'>
              <Link className='h-20 w-40 flex' href={generateLink(2)}><div className='h-20 w-44'><Contact /></div ></Link>
            </motion.li>
          </div>
        </div>

      </div>
      {/* right side manu for the mobile device */}
      <div className="items-center hidden h-20 pr-3 ml-3 cursor-pointer md:flex">
        <RiveComponent style={{width: 50}} onClick={()=>{
          setIsOpen((preState) => !preState)
          bumpInput.value=!bumpInput.value
          }} />
        <AnimatePresence>
          {isOpen && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-10 flex flex-col justify-between bg-black top-65 nav-h">
              <div className={`flex-1 p-4 ${active}`}>
                {/* isMobile默认为true */}
                <MenuItems active={active} setActive={setActive} isMobile setIsOpen={setIsOpen} inputs={bumpInput} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </nav>
  );
};

export default Navbar;
