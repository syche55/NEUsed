import React from "react";
import {
    Panel, Row, Col, Thumbnail, Button,
    Glyphicon, Modal, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar,
} from "react-bootstrap";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Post from "./components/Post.jsx";
import './Discover.css';
// import AuthContext from './auth-context';

class Discover extends React.Component {
    render() {
        const { match: { params: { category } } } = this.props;
        return (
            <div className="WithSideBar">
                <ProSidebar>
                    <SidebarHeader className="sidebar-title">Category</SidebarHeader>
                    <SidebarContent>
                        <Menu>
                            <MenuItem>
                                Latest Posts
                                <Link to="/discover/" />
                            </MenuItem>
                            <SubMenu title="Explore by Category" defaultOpen={true}>
                                <MenuItem>Apparel<Link to="./apparel" /></MenuItem>
                                <MenuItem>Electronics<Link to="./electronics" /></MenuItem>
                                <MenuItem>Entertainment<Link to="./entertainment" /></MenuItem>
                                <MenuItem>Family<Link to="./family" /></MenuItem>
                                <MenuItem>FreeStuff<Link to="./freestuff" /></MenuItem>
                                <MenuItem>Hobbies<Link to="./hobbies" /></MenuItem>
                                <MenuItem>Outdoor<Link to="./outdoor" /></MenuItem>
                                <MenuItem>Other<Link to="./other" /></MenuItem>
                            </SubMenu>
                            <MenuItem>
                                Your Posts
                                <Link to="./yourposts" />
                            </MenuItem>
                        </Menu>
                    </SidebarContent>
                </ProSidebar>
                <div className="GroupsContentsWrapper">
                    <Post category={category} />
                </div>
            </div>
        )
    }
}

export default Discover;
