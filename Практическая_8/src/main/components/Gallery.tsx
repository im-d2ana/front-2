import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import structures from "../../data";
import Container from "@mui/material/Container";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

const imgData = structures.slice(0, 6);

function Gallery() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("md"));

    const itemStyle = {
        display: "block",
        height: "100%",
        overflow: "hidden",
        position: "relative" as const,
    };

    const imgStyle = {
        height: "100%",
        width: "100%",
        objectFit: "cover" as const,
        display: "block",
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
            <ImageList cols={isSmall ? 1 : 3} gap={0} rowHeight={isSmall ? 220 : 200} sx={{ m: 0, overflow: "hidden" }}>
                <ImageListItem cols={isSmall ? 1 : 2} rows={isSmall ? 1 : 2}>
                    <Link to="/plane/0" style={itemStyle}>
                        <img src={imgData[0].img} loading="lazy" style={imgStyle} />
                        <ImageListItemBar position="bottom" title={imgData[0].title} />
                    </Link>
                </ImageListItem>

                {imgData.slice(1).map((item, idx) => (
                    <ImageListItem key={idx + 1}>
                        <Link to={`/plane/${idx + 1}`} style={itemStyle}>
                            <img src={item.img} loading="lazy" style={imgStyle} />
                            <ImageListItemBar position="bottom" title={item.title} />
                        </Link>
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    );
}

export default Gallery;