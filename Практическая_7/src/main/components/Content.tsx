import structures from "../../data";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import BigCard from "./BigCard";
import SmallCard from "./SmallCard";

function Content() {
    return (
        <Container maxWidth='xl'>
            <Grid container spacing={{xs: 3, md: 6}}>
                <Grid size={{xs: 12, md: 4}}>
                    <Grid container spacing={{xs: 3, md: 6}}>
                        <Grid>
                            <BigCard aircraft={structures[0]} cardNumber={1} />
                        </Grid>
                        <Grid>
                            <BigCard aircraft={structures[2]} cardNumber={3} />
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid size={{xs: 12, md: 4}}>
                    <Grid container spacing={{xs: 3, md: 6}}>
                        <Grid>
                            <BigCard aircraft={structures[1]} cardNumber={2} />
                        </Grid>
                        <Grid>
                            <BigCard aircraft={structures[3]} cardNumber={4} />
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid size={{xs: 12, md: 4}}>
                    <Grid container spacing={{xs: 3, md: 6}}>
                        <Grid>
                            <SmallCard aircraft={structures[4]} />
                        </Grid>
                        <Grid>
                            <SmallCard aircraft={structures[5]} />
                        </Grid>
                        <Grid>
                            <SmallCard aircraft={structures[6]} />
                        </Grid>
                        <Grid>
                            <SmallCard aircraft={structures[7]} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Content;