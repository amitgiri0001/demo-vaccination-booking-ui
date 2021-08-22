// icons
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/BarChartOutlined';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

// components
import Home from '../pages/Home';
import Error from '../pages/Error';
import BookingDetails from '../pages/BookingDetails';
import Slots from '../pages/Slots';
import Centres from '../pages/Centres';

// interface
import RouteItem from '../model/RouteItem.model';

// define app routes
export const routes: Array<RouteItem> = [
    {
        key: "router-home",
        title: "Home",
        tooltip: "Home",
        path: "/",
        enabled: true,
        component: Home,
        icon: HomeIcon,
        appendDivider: true
    },
    {
        key: "router-centres",
        title: "Select Centre",
        tooltip: "centres",
        path: "/centres",
        enabled: true,
        component: Centres,
        icon: HomeWorkIcon,
        appendDivider: true
    },
    {
        key: "router-booking-details",
        title: "Booking",
        tooltip: "Booking",
        path: "/booking",
        enabled: true,
        component: BookingDetails,
        icon: HomeIcon
    },
    {
        key: "router-error",
        title: "Error",
        tooltip: "Error",
        path: "/error",
        enabled: true,
        component: Error,
    },
    {
        key: "router-slots",
        title: "Slots",
        tooltip: "slots",
        path: "/slots",
        enabled: true,
        component: Slots,
    },
]