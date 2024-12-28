import Spinner from "@/components/spinner";
import { Box, Card, CardContent, CircularProgress, Divider, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"

interface IEmissionExhibitionProps {
    housingEmission?: number;
    transportationEmission?: number;
    showDetails?: boolean
    loading?: boolean;
}

const percentageColorByValue = (value: number): string => {
    console.log(value)
    if(value === 0) return '';
    if(value > 60) return 'error';
    return 'warning';
}

const EmissionExhibition: React.FC<IEmissionExhibitionProps> = ({ housingEmission = 0, loading = false, transportationEmission = 0, showDetails = false }: IEmissionExhibitionProps): 
    React.ReactElement<IEmissionExhibitionProps> => {
    
    const totalEmission = housingEmission + transportationEmission;
    const housingPercentage = Number(totalEmission ? (100 * housingEmission / totalEmission).toFixed(2) : 0);
    const transportationPercentage = Number(totalEmission ? (100 * transportationEmission / totalEmission).toFixed(2) : 0);

    return (
        <Card variant='outlined' sx={{height: "100%"}}>
            <Box padding={2} height="100%">
                {loading ? <Spinner /> :
                    <>
                        <Typography variant='h5' height="20%">
                            Total Emission
                        </Typography>
                        <Grid container width="100%" alignItems="center" justifyContent="center">
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
                                    <Divider sx={{marginTop: 2, marginBottom: 2}} />
                                    <Typography mb={2}>
                                        Housing emission: <Typography color={percentageColorByValue(housingPercentage)} component="span" fontWeight="bold">
                                            {housingPercentage} %
                                        </Typography>
                                    </Typography>
                                    <Typography mb={2}>
                                        Transportation emission: <Typography color={percentageColorByValue(transportationPercentage)} component="span" fontWeight="bold">
                                            {transportationPercentage} %
                                        </Typography>
                                    </Typography>
                                </> : null}
                            </CardContent>
                        </Grid>
                    </>
                }
            </Box>
        </Card>
    )
}

export default EmissionExhibition;