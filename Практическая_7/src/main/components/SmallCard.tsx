import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)(({theme}) => ({
    color: 'text.secondary',
    marginBottom: theme.spacing(1),
    textAlign: 'justify',
}));

interface ComponentProps {
    aircraft: {
        img: string,
        title: string,
        description: string,
    }
}

function SmallCard({aircraft} : ComponentProps) {

    return (
        <Card sx={{display: 'flex', flexDirection : 'row-reverse'}}>
            <CardMedia component='img' alt={aircraft.title} image={aircraft.img}
                       sx={{height: 200, width: '40%', objectFit: 'contain'}} />
            <Box>
                <CardContent>
                    <Typography gutterBottom variant='h5'>{aircraft.title}</Typography>
                        <StyledTypography variant='body2'>{aircraft.description}</StyledTypography>
                </CardContent>

                <CardActions sx={{justifyContent: 'flex-start'}}>
                    <Button size='small'>Подробнее</Button>
                </CardActions>
            </Box>
        </Card>
    );
}

export default SmallCard;