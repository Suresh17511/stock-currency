import React, {useState, useEffect} from 'react';
import axios from 'axios';
import HeroCards from './HeroCards';
import ReactPaginate from 'react-paginate';
import {createCoin} from '../../actions/coins';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coins);
  const coinNames = coins.map((coinName) => coinName.name);

  const [C_coins, setC_coins] = useState([]);
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [saveData, setSaveData] = useState({
    name: '',
    symbol: '',
    market_cap: '',
    current_price: '',
  });
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const filteredCoins = C_coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    dispatch(createCoin(saveData));
    setSaveData({
      name: '',
      symbol: '',
      market_cap: '',
      current_price: '',
    });
  };
  if (saveData.name && saveData.current_price) {
    handleSubmit();
  }

  const displayUsers = filteredCoins
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((coin) => {
      return (
        <tr key={coin.id}>
          <td>
            <h5>{coin.name}</h5>
          </td>
          <td className="symbol">
            <span>{coin.symbol}</span>
          </td>
          <td className="market_cap">${coin.market_cap}k</td>
          <td className="button">
            {coinNames.includes(`${coin.name}`) ? (
              <Link to="/view">
                <button style={{background: 'rgb(128, 115, 241)'}}>
                  View Data
                </button>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setSaveData({
                    name: coin.name,
                    symbol: coin.symbol,
                    market_cap: coin.market_cap,
                    current_price: coin.price,
                  });
                }}
              >
                Save Data
              </button>
            )}
          </td>
          <td className="current_price">
            <p>
              <span>{coin.price} &nbsp;</span>USD
            </p>
          </td>
        </tr>
      );
    });

  useEffect(() => {
    axios
      .get(
        'https://api.nomics.com/v1/currencies/ticker?key=c692ca1e205a0d3f84ef917abe3168f7996588ff&per-page=100'
      )
      .then((res) => {
        setC_coins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const pageCount = Math.ceil(C_coins.length / usersPerPage);
  const changePage = ({selected}) => {
    setPageNumber(selected);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="home">
      <div className="home_container">
        <HeroCards />
        <div className="stock_details_table">
          <div className="table_header">
            <h3>Stock Details Table</h3>
            <div className="search-box">
              <input
                type="text"
                className="search-text"
                name="search"
                value={search}
                onChange={handleChange}
                placeholder="Search by currency name..."
              />
              <button className="search-btn" onClick={() => {}}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <th>
                  <h5>Currency Name</h5>
                </th>
                <th>
                  <h5>Symbol</h5>
                </th>
                <th>
                  <h5>market cap</h5>
                </th>
                <th>
                  <h5>&nbsp;</h5>
                </th>
                <th>
                  <h5>current price</h5>
                </th>
              </tr>
              {displayUsers}
            </tbody>
          </table>
          <div className="div_footer">
            <ReactPaginate
              previousLabel={<i className="bx bxs-chevron-left"></i>}
              nextLabel={<i className="bx bxs-chevron-right"></i>}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={'paginationBttns'}
              previousLinkClassName={'previousBttn'}
              nextLinkClassName={'nextBttn'}
              disabledClassName={'paginationDisabled'}
              activeClassName={'paginationActive'}
            />
          </div>
        </div>

        <div className="mob_container">
          <button
            onClick={() => {
              history.push('/view');
            }}
          >
            View saved data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
