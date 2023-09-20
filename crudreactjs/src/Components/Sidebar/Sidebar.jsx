import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
import './SubMenu.js';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <i className='bx bxs-dashboard'></i>,
        to: '/home',
        section: 'home',
        iconClosed:<i class='bx bx-chevron-down'></i>,
        iconOpened:<i class='bx bx-chevron-up'></i>,

        // subNav: [
        //     {
        //       display:'Dashboard1',
        //       icon:<i className='bx bs-dashboard'></i>,
        //       to:'/home',
        //       section:'home'
                
        //     },
        //     {
        //       title: "Dashboard2",
        //       path: "/home",
        //       icon: <i className='bx bxs-dashboard'></i>,
        //     },
        //   ],
    },
    {
        display: 'Employee',
        icon: <i className='bx bx-star'></i>,
        to: '/employee',
        section: 'employee'
    },
    {
        display: 'Department',
        icon: <i className='bx bx-building'></i>,
        to: '/department',
        section: 'department'
    },
    {
        display: 'PdfViewer',
        icon: <i className='bx bx-building'></i>,
        to: '/pdfViewer',
        section: 'pdfViewer'
    },
    {
        display: 'DepartmentSqlPaging',
        icon: <i className='bx bx-building'></i>,
        to: '/departmentPagination',
        section: 'departmentPagination'
    }
    
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    const [subNav, setSubNav] = useState(0);
    const showSubNav = () => setSubNav(!subNav)

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            OPMIS
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                            <div className={`sidebar__menu__rightIcon ${activeIndex === index ? 'active' : ''}`}>
                                {item.iconClosed}
                            </div>
                        </div>
                    </Link>
                ))
            }
            {/* {
                subNav.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                        <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                

                ))
            } */}
        </div>
    </div>;
};

export default Sidebar;