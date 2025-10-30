import {
  faBars,
  faCaretDown,
  faSquarePollHorizontal,
  faTicket,
  faPlaneDeparture,
  faBed,
  faCarSide,
  faEarth,
  faClockRotateLeft,
  faWallet,
  faHeart,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SideBar._MainWindow.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';





function TestRouting1(){
  return(<>
    <Dump></Dump>
  </>)
}
function TestRouting2(){
  return(<>
  <Dump></Dump>
  <Dump></Dump>
  </>)
}




function Dump() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#252525",
          color: "white",
          border: "1px solid white",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h1>Hello</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident,
          vitae. Voluptatibus dolorum eveniet omnis dolor illo a nam nostrum
          facere, rem sit adipisci amet minus ab quo facilis vero aut.
        </p>
      </div>
    </>
  );
}

function SideBar_MainWindow() {
  
  const [FlipAn, setFlipAn] = useState(false);
  const [DashBoard, setDashBoard] = useState(false);



  //SideBar Items:
  const SubMenu_1 = [
    { Section: "Flights", icon: faPlaneDeparture },
    { Section: "Hotels", icon: faBed },
    { Section: "Car Rentals", icon: faCarSide },
    { Section: "Flights", icon: faEarth },
  ];

  const SideBar = [
    { Section: "Overview", icon: faSquarePollHorizontal, hasSubM: false },
    { Section: "MyTickets", icon: faTicket, hasSubM: true, SubM: SubMenu_1 },
    { Section: "MyTrips", icon: faClockRotateLeft, hasSubM: false },
    { Section: "Wallet", icon: faWallet, hasSubM: false },
    { Section: "Favourit", icon: faHeart, hasSubM: false },
    { Section: "Settings", icon: faGear, hasSubM: false },
  ];




  //SideBar Generation
    function GenerateSideBar({ Array }) {
    const [rotateIndex, setRotateIndex] = useState(null);

    return (
      <ul id="menu">
        {Array.map((item, index) => (
          <li key={index}  >
            <div className="MainLi">
              <FontAwesomeIcon icon={item.icon}  className="Icon"></FontAwesomeIcon>
              <p>{item.Section}</p>

              {item.hasSubM && (
                <button
                  onClick={() => {
                    setRotateIndex(rotateIndex === index ? null : index);
                  }

                  }
                  className={`SButton SubMenuToogle ${rotateIndex === index ? "Rotate" : ""
                    }`}
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              )}
            </div>

            {item.hasSubM && (
              <GenerateSubMenu Array={item.SubM} active={((rotateIndex == index) && DashBoard) ? true : false} />
            )}
          </li>
        ))}
      </ul>
    );
  }


  function GenerateSubMenu({ Array, active }) {
    return (
      <>
        <ul className={active ? "SubMenu Show" : "SubMenu"}>
          <div> {/* this div is used to make the transtion of the drop happens (height auto dosn't aniamte)*/}
            {Array.map((item, index) => (
              <li key={index}>
                <FontAwesomeIcon icon={item.icon}></FontAwesomeIcon>
                {item.Section}
              </li>
            ))}
          </div>
        </ul>
      </>
    );
  }










//SideBar Functions
  function FliPButton() {
    setFlipAn(true);
    setTimeout(() => {
      setFlipAn(false);
    }, 500);
  }
  function ToogleDashBoard() {
    FliPButton();
    setDashBoard(!DashBoard);

  }





  return (
    <>
      <div className={DashBoard ? "Container" : "Container Closed"}>
        <div className={DashBoard ? "SideBar" : "SideBar Closed"}>
          <div className="MenuHead" style={{ translateX: DashBoard ? "-100%" : "" }}>
            <h2 style={{ width: DashBoard ? "100%" : "0", overflow: "hidden", transition: "0.5s" }}>Dashboard</h2>
            <button
              className="SButton ToogleMenu"
              onClick={ToogleDashBoard}
              style={{ animation: FlipAn ? "Flip 0.5s ease-in-out" : "" }}
            >
              <FontAwesomeIcon icon={faBars} size="2xl" />
            </button>
          </div>
          <div className="Menu">
            <GenerateSideBar Array={SideBar} />
          </div>
        </div>
        <div className="MainWindow">



          <Dump />
          <Dump />
          <Dump />
          <Dump />
          <Dump />
          <Dump />
          <Dump />
          <Dump />
          <Dump />
          <Dump />
          <Dump />
          <Dump />
          <Dump />
          <Dump />
          <Dump />
        </div>
      </div>
    </>
  );
}
export default SideBar_MainWindow;
