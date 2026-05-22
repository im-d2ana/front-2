import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import structures from "../data";
import Container from "@mui/material/Container";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const imgData = structures.slice(0, 6);

function Gallery() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Container maxWidth='lg' sx={{ mt: 3, mb: 3 }}>
            <ImageList cols={isSmall ? 1 : 3} gap={0} rowHeight={isSmall ? 'auto' : 200} sx={{ m: 0 }}>
                <ImageListItem cols={isSmall ? 1 : 2} rows={isSmall ? 1 : 2}>
                    <img src={imgData[0].img} loading="lazy" 
                         style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                    <ImageListItemBar position="bottom" title={imgData[0].title} />
                </ImageListItem>

                <ImageListItem>
                    <img src={imgData[1].img} loading="lazy" 
                         style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                    <ImageListItemBar position="bottom" title={imgData[1].title} />
                </ImageListItem>

                <ImageListItem>
                    <img src={imgData[2].img} loading="lazy" 
                         style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                    <ImageListItemBar position="bottom" title={imgData[2].title} />
                </ImageListItem>

                {imgData.slice(3).map((item, idx) => (
                    <ImageListItem key={idx}>
                        <img src={item.img} loading="lazy" 
                             style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                        <ImageListItemBar position="bottom" title={item.title} />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    );
}

export default Gallery;