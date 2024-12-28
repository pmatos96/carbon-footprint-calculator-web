import { Box, Card, CardContent, CircularProgress, Divider, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"

interface IEmissionExhibitionProps {
    housingEmission?: number;
    transportationEmission?: number;
    showDetails?: boolean
    loading?: boolean;
}

const EmissionExhibition: React.FC<IEmissionExhibitionProps> = ({ housingEmission = 0, loading = false, transportationEmission = 0, showDetails = false }: IEmissionExhibitionProps): 
    React.ReactElement<IEmissionExhibitionProps> => {
    
    const totalEmission = housingEmission + transportationEmission;

    return (
        <Card variant='outlined'>
            {loading ? <CircularProgress /> :
                <Box padding={2} height="100%">
                    <Typography variant='h5' height="20%">
                        Total Emission
                    </Typography>
                    <Grid container width="80%" alignItems="center">
                        <CardContent>
                            <Typography variant="h3">
                                {totalEmission.toFixed(2)}
                            </Typography>
                            <Typography color='text.secondary'>
                                lbs of
                            </Typography>
                            <Typography paddingLeft={1} component="span" variant="h3">
                                CO₂e
                            </Typography>
                            {showDetails ? <>
                                <Divider />
                                <Typography>
                                    Housing emission: { totalEmission ? (100 * housingEmission / totalEmission).toFixed(2) : 0} % 
                                    Transportation emission: {totalEmission ? (100 * transportationEmission / totalEmission).toFixed(2) : 0} %
                                </Typography>
                            </> : null}
                        </CardContent>
                    </Grid>
                </Box>
            }
        </Card>
    )
}

export default EmissionExhibition;