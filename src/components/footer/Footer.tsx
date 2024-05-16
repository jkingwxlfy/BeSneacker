import Vk from '@assets/vk.png'
import Whatsap from '@assets/whatsap.png'
import './footer.scss'

interface ICollections {
    name: string
}

const collections: ICollections[] = [
    { name: 'Nike' },
    { name: 'Adidas' },
    { name: 'Rebook' },
    { name: 'Streetwear' },
]

const Footer: React.FC = () => {
    return (
        <section className='footer'>
            <div className='footer__wrapper'>
                <div className='footer__title'>BeSneacker. BeYourself.</div>
                <div className='footer__collections'>
                    {collections.map(item => (
                        <div
                            className='footer__collections-item'
                            key={item.name}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
                {/* <div className='footer__border' />
                <div className='footer__contacts'>
                    <div className='footer__contacts-title'>
                        Связаться с нами
                    </div>
                    <div className='footer__contacts-images'>
                        <img src={Whatsap} alt='Картинка лого контактов' />
                        <img src={Vk} alt='Картинка лого контактов' />
                    </div>
                </div> */}
            </div>
        </section>
    )
}
export default Footer
