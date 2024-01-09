import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const CardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const CustomCard = styled(Card)({
  position: 'relative',
  width: '300px',
  margin: '25px',
  height: 'auto',
  backgroundColor: '#F2F2F22',
  borderRadius: '10px',
  border: '1px solid #B5B5B5',
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
  '@media (max-width: 600px)': {
    width: '100%',
  },
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: ' #EAEAEA',
  },
});

const CardImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 0.7,
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [infoCards, setInfoCards] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [favorites, setFavorites] = useState([]);

  const handleExpandClick = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  const handleShareClick = async (url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Confira esta promoção!',
          text: 'Promoção incrível que você pode gostar.',
          url,
        });
      } catch (error) {
        console.error('Erro ao compartilhar link:', error);
      }
    }
  };

  const handleFavoriteClick = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put('http://localhost:3000/fav/favoritar/', { id }, config);

      setFavorites((prevFavorites) => [...prevFavorites, id]);

      infoCards.find((card) => card._id === id);
    } catch (error) {
      console.error('Erro ao favoritar:', error);
    }
  };


  async function CardInfo() {
    try {
      const { data } = await axios.get("http://localhost:3000/post/listar");
      setInfoCards(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  useEffect(() => {
    CardInfo();
  }, []);


  return (
    <CardContainer>
      {infoCards.map((infoCard) => (
        <CustomCard key={infoCard._id}>
          <CardHeader title={infoCard.productName} />
          <a href={infoCard.productLink} target="_blank" rel="noopener noreferrer">
            <CardImage src={infoCard.imageUrl} alt="link da Promoção" />
          </a>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Preço: {parseFloat(infoCard.productPrice).toFixed(2)}
            </Typography>
            <Typography>
              Postado por: {infoCard.userName}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="adicionar aos favoritos"
              onClick={() => handleFavoriteClick(infoCard._id)}
              color={favorites.includes(infoCard._id) ? 'secondary' : 'default'}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="compartilhar" onClick={() => handleShareClick(infoCard.productLink)}>
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded[infoCard._id]}
              onClick={() => handleExpandClick(infoCard._id)}
              aria-expanded={expanded[infoCard._id]}
              aria-label="mostrar mais"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded[infoCard._id]} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Descrição: {infoCard.productDescription}</Typography>
            </CardContent>
          </Collapse>
        </CustomCard>
      ))}
    </CardContainer>
  );
}
