import React from "react";
import {
    Panel, Row, Col, Thumbnail, Button,
    Glyphicon, Modal, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar,
} from "react-bootstrap";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Posts from "./Posts.jsx";

class Discover extends React.Component {
    render() {
        return (
            <div className="WithSideBar">
                <ProSidebar>
                    <SidebarHeader>Category</SidebarHeader>
                    <SidebarContent>
                        <Menu>
                            <MenuItem>
                                Your Feed
                                <Link to="/category/" />
                            </MenuItem>
                            <SubMenu title="Explore by Category">
                                <MenuItem>All Categories<Link to="./all" /></MenuItem>
                                <MenuItem>Ideas<Link to="./ideas" /></MenuItem>
                                <MenuItem>Artworks<Link to="./artworks" /></MenuItem>
                                <MenuItem>Spots Around You<Link to="./spotsaroundyou" /></MenuItem>
                                <MenuItem>Fashion<Link to="./fashion" /></MenuItem>
                                <MenuItem>Activities<Link to="./activities" /></MenuItem>
                                <MenuItem>Events<Link to="./events" /></MenuItem>
                                <MenuItem>Life<Link to="./life" /></MenuItem>
                            </SubMenu>
                            <SubMenu title="Your Category" defaultOpen={true}>
                            </SubMenu>
                        </Menu>
                    </SidebarContent>
                </ProSidebar>
                <div className="GroupsContentsWrapper">
                    <Posts />
                </div>
            </div>
        )
    }
}

export default Discover;
