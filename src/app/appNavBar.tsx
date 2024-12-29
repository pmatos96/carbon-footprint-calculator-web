import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid2";
import SpaIcon from '@mui/icons-material/Spa';
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

type PageItem = {
    name: string,
    route: string
}

interface IAppNavBarProps {
    pageItems: PageItem[]
}

const AppNavBar = ({ pageItems }: IAppNavBarProps): React.ReactElement => {

    const router = useRouter();

    return (
        <AppBar sx={{ padding: 2 }} position='static'>
            <Grid height="100%" display="flex" justifyContent="space-between" container alignItems="center">
                <Grid container>
                    <SpaIcon fontSize='medium' sx={{ marginRight: 1 }} />
                    <Typography variant="h6">
                        Carbon Footprint Calculator
                    </Typography>
                </Grid>
                <Toolbar>
                    {pageItems.map(item => {
                        return (<Button key={item.name} onClick={() => router.push(item.route)}>
                            <Typography variant='button' color='white'>{item.name}</Typography>
                        </Button>)
                    })}
                </Toolbar>
          </Grid>
        </AppBar>
    )
}

export default AppNavBar;