import { Card, CardContent, Divider, Typography } from "@mui/material"

interface IEmissionExhibitionProps {
    housingEmission?: number;
    transportationEmission?: number;
    showDetails?: boolean
}

const EmissionExhibition: React.FC<IEmissionExhibitionProps> = ({ housingEmission = 0, transportationEmission = 0, showDetails = false }: IEmissionExhibitionProps): 
    React.ReactElement<IEmissionExhibitionProps> => {
    
    const totalEmission = housingEmission + transportationEmission;

    return (
        <Card variant='outlined'>
            <CardContent>
                <Typography variant='h5'>
                    Total Emission
                </Typography>
                <Typography variant="h3">
                    {totalEmission.toFixed(2)}
                </Typography>
                <Typography component="span" color='text.secondary'>
                    lbs of
                </Typography>
                <Typography paddingLeft={1} component="span" variant="h4">
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
        </Card>
    )
}

export default EmissionExhibition;