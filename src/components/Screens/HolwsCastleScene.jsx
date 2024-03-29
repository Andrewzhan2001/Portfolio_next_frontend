import React, {useEffect, useRef, useState} from 'react'
import { motion, useScroll, useSpring, useInView, useTransform } from 'framer-motion'
import HolwsCastle from '../Characters/HolwsCastle'
const HolwsCastleScene = () => {

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const springY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const x = useTransform(springY, [0, 1], ["0","-200vw"]);
  const y = useTransform(springY, [0, 1], ["0","-200vh"]);
  const opacity = useTransform(springY, [0,0.1,0.9,1], [0,1,1,0]);
  const grass1X = useTransform(springY, [0,0.5, 1], ["0","0","-50vw"]);
  const grass2X = useTransform(springY, [0,0.5, 1], ["0","0","50vw"]);
  const cloudX = useTransform(springY, [0, 1], [0,1200]);
  const cloudleft = useTransform(springY, [0,0.5, 1], [0,0,-400]);
  const cloudY = useTransform(springY, [0, 1], [0,1000]);
  const cloudX2 = useTransform(springY, [0, 1], [0,2000]);
  const cloudY2 = useTransform(springY, [0, 1], [0,1200]);

  const [show, setshow] = useState(false)
  const isInView = useInView(ref, {margin: "-10px 0px -10px 0px"})
  useEffect(() => {
    if (isInView) {
      setshow(true);
    } else {
      setshow(false);
    }
  }, [isInView])
  return (
    <div ref={ref} className='w-screen h-[400vh] bg-[#0497d1] relative flex flex-col'>
      <div className={`${show ? "": "hidden"} fixed`}>
        <motion.div style={{opacity}} className='w-screen h-screen fixed top-[100%] -right-[100vw] z-40'>
          <motion.div style={{x,y}} className='z-50'><HolwsCastle /></motion.div>
          <motion.img style={{x: grass1X}} className='-bottom-1 fixed left-0 h-[200px] w-[400px] z-50 blur-[2px]' src='HolwsCastle/grass1.png' />
          <motion.img style={{x: grass2X}} className='-bottom-1 fixed right-0 h-[100px] w-[300px] z-50 blur-sm' src='HolwsCastle/grass2.png' />
          <motion.img style={{width: cloudX, height:cloudY, x:cloudleft}} className='bottom-0 blur-sm fixed left-0 h-[30px] w-[400px] z-40' src='HolwsCastle/cloud1.png' />
          <motion.img style={{width: cloudX2, height:cloudY2}} className='bottom-0 fixed right-0 h-[400px] w-[850px] z-40' src='HolwsCastle/cloud2.png' />
        </motion.div>
      </div>
      <div className='h-screen'></div>
      <div className='z-50 w-screen h-screen'>
        <div className='flex flex-col justify-center pl-[10%]'>
          <h2 className='text-xl font-semibold text-white'>In addition to web design and programming, I am enthusiastic about</h2>
          <h2 className='text-5xl max-w-5xl font-extrabold text-[#811fce]'>Creating 3d models, game design, mobile Apps and AI development</h2>
          <h2 className='text-xl font-bold text-white'>I try to utilize those in my life, career and education</h2>
        </div>
      </div>
      <div className='z-50 w-screen h-screen'>
        <div className='flex flex-col justify-center pl-[10%]'>
          <h2 className='text-xl font-semibold text-white'>During my spare time, I love</h2>
          <h2 className='text-5xl font-extrabold text-[#811fce] '>Watching movies (especially Howl's Moving Castle) </h2>
          <h2 className='text-5xl max-w-5xl font-extrabold text-[#811fce] '>And playing video games</h2>
          <h2 className='text-xl font-bold text-white'>I also enjoy delicacies, travelling and skiing</h2>
        </div>
      </div>
      <div className='h-screen'></div>
    </div>
  )
}

export default HolwsCastleScene
