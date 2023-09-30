import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Sidebar.css";
import { AiFillSetting, AiOutlineFileText } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import {
  MdOutlineDesignServices
} from "react-icons/md";
import {useParams} from 'react-router-dom'
import { GiAchievement } from "react-icons/gi";
import {  NavLink } from "react-router-dom";
import { CgMenuRight } from "react-icons/cg";
import Header from "../Header/Header";
import Dashboard from "../../../modules/Dashboard/Dashboard";

const Sidebar = () => {
 
  const [isOpenSidebar, setIsOpenSidebar] = useState(window.innerWidth > 940 ? true : false);

  const {id} = useParams();
 
  const routes = [
    {
      path: `/`,
      name: "dashboard",
      icon: <AiOutlineFileText size={isOpenSidebar ? "20" : "24"} />,
    },
    {
      path: `/`,
      name: "my articles",
      icon: <BsBriefcase size={isOpenSidebar ? "20" : "24"} />,
    },
    {
      path: `/`,
      name: "inbox",
      icon: <MdOutlineDesignServices size={isOpenSidebar ? "20" : "24"} />,
    },
    {
      path: `/`,
      name: "earning",
      icon: <GiAchievement size={isOpenSidebar ? "20" : "24"} />,
    },
    {
      path: `/`,
      name: "settings",
      icon: <AiFillSetting size={isOpenSidebar ? "20" : "24"} />,
    },
  ];

  const toggleSidebar = () => setIsOpenSidebar(!isOpenSidebar);

  const midSectionAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
    },
    show: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };

  const scoreAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };

  const menuTextAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  const closeSidebar = () => {
    if(isOpenSidebar && window.innerWidth < 940){
      setIsOpenSidebar(!isOpenSidebar)
    }
  }

  return (
    <div className="main_container_sidebar">
      <motion.div
        animate={{
          width: window.innerWidth > 940 ? (isOpenSidebar ? "280px" : "60px") : (isOpenSidebar ? "280px" : "0px"),
          position: window.innerWidth >940 ? "fixed" : "fixed",
          transition: { duration: 0.3, type: "spring,", damping: 11 },
        }}
        className="sidebar_container_sidebar"
      >
        <div className="top_section_sidebar">
          {isOpenSidebar && <h2>BLOGGERS</h2>}
          <div
            className="hamburger_menu_sidebar"
            style={{ marginLeft: isOpenSidebar ? "20px" : "-10px" }}
          >
            <CgMenuRight size={38} onClick={toggleSidebar} />
          </div>
        </div>

        <AnimatePresence>
          {isOpenSidebar && (
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={midSectionAnimation}
              className="mid_section_sidebar"
            >
              <div className="user_image_container_sidebar">
                <img src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" alt="user" />
              </div>
              <h2>
                Hello, <span>Gautam</span>
              </h2>
              <h3>abc@gmail.com</h3>
            </motion.div>
          )}
        </AnimatePresence>

        {isOpenSidebar && (
          <motion.div initial="hidden"
          animate="show"
          exit="hidden"
          variants={scoreAnimation} className="score_section_sidebar">

          <div className="right_score_section_sidebar">
            <h3>Your Profile Health</h3>
            {/* <p>Complete your profile for better chances of internships.</p> */}
          </div>
        </motion.div>
        )}

        <section className="routes_container_sidebar">
          {routes.map((routes) => (
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "routes_link_sidebar active_sidebar"
                  : "routes_link_sidebar"
              }
              to={routes.path}
              key={routes.name}
              style={{ padding: isOpenSidebar ? "13px 20px" : "20px" }}
              onClick={closeSidebar}
            >
              <div className="side_menu_icon_sidebar">{routes.icon}</div>
              <AnimatePresence>
                {isOpenSidebar && (
                  <motion.div
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={menuTextAnimation}
                    className="side_menu_text_sidebar"
                  >
                    {routes.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
      </motion.div>
      <motion.main
        className="children_container_sidebar"
        animate={{
          paddingLeft: window.innerWidth > 940 ? (isOpenSidebar ? "280px" : "60px") : "0px",
          transition: { duration: 0.3, type: "spring,", damping: 11 },
        }}
        style = {{position:"absolute"}}
      >
        <Header
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
          userid={id}
        />
        
        <Dashboard />
      </motion.main>
    </div>
  );
};

export default Sidebar;
