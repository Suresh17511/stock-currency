import React from 'react';
import HeroCards from '../home/HeroCards';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCoin} from '../../actions/coins';
import {Link, useHistory} from 'react-router-dom';

const View = () => {
  const coins = useSelector((state) => state.coins);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="view">
      <div className="view_container">
        <div className="hero_cards_display">
          <HeroCards />
        </div>
        <div className="stock_details_table">
          <table>
            <tbody>
              <tr className="saved_data_table">
                <th colSpan={6}>
                  <h5>SAVED DATA TABLE</h5>
                </th>
              </tr>
              {coins.map((coin) => (
                <tr key={coin._id}>
                  <td>
                    <h5>{coin.name}</h5>
                  </td>
                  <td className="symbol">
                    <span>{coin.symbol}</span>
                  </td>
                  <td className="market_cap">${coin.market_cap}k</td>
                  <td className="button">
                    <button onClick={() => dispatch(deleteCoin(coin._id))}>
                      Delete Data
                    </button>
                  </td>
                  <td className="current_price">
                    <p>
                      <span>{coin.current_price} &nbsp;</span>USD
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="div_footer">
            <Link to="/">
              <div className="button">
                <button>back</button>
              </div>
            </Link>
          </div>
        </div>
        <div className="mob_container">
          <button
            onClick={() => {
              history.push('/view');
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
