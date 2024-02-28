import ConnectWallet from '../connectWallet/ConnectWallet';
import './Header.scss';

function Header() {
  return (
    <div className='header'>
      <div className="left-side">
        <img src="https://xter.io/images/xterio_colorful.svg?w=200&q=80" alt="Logo" />
        <ul>
          <li>Games</li>
          <li>Launchpad</li>
        </ul>
      </div>
      <div className="right-side">
          <ConnectWallet/>
      </div>
    </div>
  )
}

export default Header