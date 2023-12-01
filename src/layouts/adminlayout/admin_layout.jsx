import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admin/admin_navbar";

import './admin_layout.css';

const { Content } = Layout;

function AdminLayout() {
    
    const [timeoutId, setTimeoutId] = useState(null);

    const resetSessionTimeout = () => {
        clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => {
            alert("Session Expired");
            
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            
            window.location.href = '/';
        }, 3600);
        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        const eventListeners = ['mousemove', 'keydown', 'click'];

        const eventListenerCallback = () => {
            resetSessionTimeout();
        };

        eventListeners.forEach(eventType => {
            window.addEventListener(eventType, eventListenerCallback);
        });
        return () => {
            eventListeners.forEach(eventType => {
                window.removeEventListener(eventType, eventListenerCallback);
            });
        };
    }, [timeoutId]);

    return (
        <>
            <div className="maincont">
                <Layout>
                    <AdminNavbar />
                    <div className="admin-body-width">
                        <Content>
                            <Outlet />
                        </Content>
                    </div>

                </Layout>
            </div>

        </>
    )
}

export default AdminLayout