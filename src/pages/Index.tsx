import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  title: string;
  price: number;
  discount: number;
  image: string;
  rating: number;
  genre: string;
  platforms: string[];
}

interface CartItem extends Game {
  quantity: number;
}

interface LibraryItem {
  gameId: number;
  gameTitle: string;
  key: string;
  purchaseDate: string;
}

const GAMES: Game[] = [
  {
    id: 1,
    title: 'Dark Souls: Remastered',
    price: 1999,
    discount: 50,
    image: 'https://cdn.poehali.dev/projects/d2cf1ea1-243c-40a0-9db3-649c8d853c95/files/ef599c85-d025-44f1-a2fb-37217f4b44f2.jpg',
    rating: 4.8,
    genre: 'RPG',
    platforms: ['windows', 'mac']
  },
  {
    id: 2,
    title: 'Cyberpunk 2077',
    price: 2499,
    discount: 30,
    image: 'https://cdn.poehali.dev/projects/d2cf1ea1-243c-40a0-9db3-649c8d853c95/files/f69fff68-08b8-4c9e-8728-c6be6ce15800.jpg',
    rating: 4.5,
    genre: 'Action',
    platforms: ['windows']
  },
  {
    id: 3,
    title: 'The Last of Us',
    price: 3499,
    discount: 0,
    image: 'https://cdn.poehali.dev/projects/d2cf1ea1-243c-40a0-9db3-649c8d853c95/files/e000b4a9-5ba6-4db5-8db1-a1048812887d.jpg',
    rating: 4.9,
    genre: 'Adventure',
    platforms: ['windows', 'mac', 'linux']
  },
  {
    id: 4,
    title: 'Grand Theft Auto V',
    price: 2999,
    discount: 40,
    image: 'https://cdn.poehali.dev/projects/d2cf1ea1-243c-40a0-9db3-649c8d853c95/files/33a73906-5d0e-4311-a7f7-72dcd63ad208.jpg',
    rating: 4.7,
    genre: 'Action',
    platforms: ['windows']
  },
  {
    id: 5,
    title: 'People Playground',
    price: 599,
    discount: 20,
    image: 'https://cdn.poehali.dev/projects/d2cf1ea1-243c-40a0-9db3-649c8d853c95/files/042d8510-408b-4ac2-b835-b7bce965a9e6.jpg',
    rating: 4.6,
    genre: 'Simulation',
    platforms: ['windows', 'mac', 'linux']
  },
  {
    id: 6,
    title: 'Minecraft',
    price: 1999,
    discount: 0,
    image: 'https://cdn.poehali.dev/projects/d2cf1ea1-243c-40a0-9db3-649c8d853c95/files/bdbfed60-7b2c-415b-a737-a4f627f5e10b.jpg',
    rating: 4.9,
    genre: 'Sandbox',
    platforms: ['windows', 'mac', 'linux']
  },
  {
    id: 7,
    title: 'The Witcher 3: Wild Hunt',
    price: 2499,
    discount: 60,
    image: 'https://cdn.poehali.dev/projects/d2cf1ea1-243c-40a0-9db3-649c8d853c95/files/7a84d0c9-d2f5-421e-af91-270dcb3c8745.jpg',
    rating: 4.9,
    genre: 'RPG',
    platforms: ['windows']
  },
  {
    id: 8,
    title: 'Red Dead Redemption 2',
    price: 3999,
    discount: 25,
    image: 'https://cdn.poehali.dev/projects/d2cf1ea1-243c-40a0-9db3-649c8d853c95/files/19ec191c-411d-4b62-9e31-e3ecd66ccc5d.jpg',
    rating: 4.8,
    genre: 'Adventure',
    platforms: ['windows']
  },
  {
    id: 9,
    title: 'CS:GO',
    price: 0,
    discount: 0,
    image: 'https://cdn.poehali.dev/projects/d2cf1ea1-243c-40a0-9db3-649c8d853c95/files/8d8deed1-23ed-4528-a05f-d573d17474c1.jpg',
    rating: 4.7,
    genre: 'Shooter',
    platforms: ['windows', 'mac', 'linux']
  },
  {
    id: 10,
    title: 'Elden Ring',
    price: 3999,
    discount: 15,
    image: 'https://cdn.poehali.dev/projects/d2cf1ea1-243c-40a0-9db3-649c8d853c95/files/0a24b840-5302-4144-aaa5-d5078a7b9970.jpg',
    rating: 4.8,
    genre: 'RPG',
    platforms: ['windows']
  },
  {
    id: 11,
    title: 'Hogwarts Legacy',
    price: 4999,
    discount: 10,
    image: 'https://cdn.poehali.dev/projects/d2cf1ea1-243c-40a0-9db3-649c8d853c95/files/e8b9c0f2-7b8e-4927-bcbc-89c8e30553da.jpg',
    rating: 4.6,
    genre: 'RPG',
    platforms: ['windows']
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const addToCart = (game: Game) => {
    const existingItem = cart.find(item => item.id === game.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...game, quantity: 1 }]);
    }
  };

  const removeFromCart = (gameId: number) => {
    setCart(cart.filter(item => item.id !== gameId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const finalPrice = item.price * (1 - item.discount / 100);
      return total + finalPrice * item.quantity;
    }, 0);
  };

  const completePurchase = () => {
    const newLibraryItems: LibraryItem[] = cart.map(item => ({
      gameId: item.id,
      gameTitle: item.title,
      key: `${item.title.substring(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      purchaseDate: new Date().toLocaleDateString('ru-RU')
    }));
    
    setLibrary([...library, ...newLibraryItems]);
    setCart([]);
    setActiveTab('library');
  };

  const filteredGames = selectedGenre === 'all' 
    ? GAMES 
    : GAMES.filter(game => game.genre === selectedGenre);

  const cartTotal = cart.length;

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-2">
                <Icon name="Gamepad2" size={28} className="text-foreground" />
                <span className="text-xl font-bold text-foreground">GameKeys</span>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => setActiveTab('home')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'home' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Главная
                </button>
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'catalog' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Каталог
                </button>
                <button 
                  onClick={() => setActiveTab('library')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'library' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Библиотека
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setActiveTab('cart')}
              >
                <Icon name="ShoppingCart" size={20} />
                {cartTotal > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground">
                    {cartTotal}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${GAMES[0].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-center px-16 space-y-6 max-w-2xl">
                <Badge className="w-fit bg-accent text-accent-foreground text-sm px-3 py-1">
                  Скидка -50%
                </Badge>
                <h1 className="text-6xl font-extrabold tracking-tight">
                  {GAMES[0].title}
                </h1>
                <p className="text-muted-foreground text-xl leading-relaxed">
                  Легендарная RPG с глубоким геймплеем и атмосферным миром
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold">
                    {(GAMES[0].price * (1 - GAMES[0].discount / 100)).toFixed(0)} ₽
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    {GAMES[0].price} ₽
                  </span>
                </div>
                <Button 
                  size="lg" 
                  className="w-fit bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-base"
                  onClick={() => addToCart(GAMES[0])}
                >
                  Купить сейчас
                </Button>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Специальные предложения</h2>
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  Смотреть все
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {GAMES.slice(0, 8).map(game => (
                  <Card 
                    key={game.id} 
                    className="overflow-hidden group cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-1 border-0 shadow-md"
                  >
                    <div className="relative h-52 overflow-hidden bg-secondary">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {game.discount > 0 && (
                        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">
                          -{game.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-base line-clamp-2 mb-1">{game.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="text-xs px-2 py-0">{game.genre}</Badge>
                        </div>
                      </div>

                      <div className="flex items-end justify-between pt-1">
                        <div>
                          {game.discount > 0 ? (
                            <div className="flex flex-col">
                              <span className="text-xs text-muted-foreground line-through">
                                {game.price} ₽
                              </span>
                              <span className="text-xl font-bold">
                                {(game.price * (1 - game.discount / 100)).toFixed(0)} ₽
                              </span>
                            </div>
                          ) : game.price === 0 ? (
                            <span className="text-xl font-bold text-accent">Бесплатно</span>
                          ) : (
                            <span className="text-xl font-bold">{game.price} ₽</span>
                          )}
                        </div>
                        <Button 
                          size="sm"
                          className="bg-accent hover:bg-accent/90 text-accent-foreground h-8 w-8 p-0"
                          onClick={() => addToCart(game)}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-bold tracking-tight">Каталог игр</h2>
              <div className="flex gap-2 flex-wrap">
                {['all', 'RPG', 'Action', 'Adventure', 'Simulation', 'Sandbox', 'Shooter'].map(genre => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedGenre === genre 
                        ? 'bg-foreground text-background' 
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {genre === 'all' ? 'Все' : genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredGames.map(game => (
                <Card 
                  key={game.id} 
                  className="overflow-hidden group cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-1 border-0 shadow-md"
                >
                  <div className="relative h-52 overflow-hidden bg-secondary">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {game.discount > 0 && (
                      <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">
                        -{game.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-base line-clamp-2 mb-1">{game.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs px-2 py-0">{game.genre}</Badge>
                      </div>
                    </div>

                    <div className="flex items-end justify-between pt-1">
                      <div>
                        {game.discount > 0 ? (
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground line-through">
                              {game.price} ₽
                            </span>
                            <span className="text-xl font-bold">
                              {(game.price * (1 - game.discount / 100)).toFixed(0)} ₽
                            </span>
                          </div>
                        ) : game.price === 0 ? (
                          <span className="text-xl font-bold text-accent">Бесплатно</span>
                        ) : (
                          <span className="text-xl font-bold">{game.price} ₽</span>
                        )}
                      </div>
                      <Button 
                        size="sm"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground h-8 w-8 p-0"
                        onClick={() => addToCart(game)}
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold tracking-tight">Корзина</h2>
            
            {cart.length === 0 ? (
              <Card className="p-16 text-center border-0 shadow-md">
                <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground mb-6">Корзина пуста</p>
                <Button 
                  onClick={() => setActiveTab('catalog')}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Перейти в каталог
                </Button>
              </Card>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map(item => (
                    <Card key={item.id} className="p-5 border-0 shadow-md">
                      <div className="flex gap-5">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">{item.genre}</Badge>
                            {item.discount > 0 && (
                              <span className="text-xs text-accent font-semibold">
                                -{item.discount}% скидка
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <button 
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="X" size={20} />
                          </button>
                          <div className="text-right">
                            {item.discount > 0 ? (
                              <>
                                <div className="text-2xl font-bold">
                                  {(item.price * (1 - item.discount / 100)).toFixed(0)} ₽
                                </div>
                                <div className="text-sm text-muted-foreground line-through">
                                  {item.price} ₽
                                </div>
                              </>
                            ) : item.price === 0 ? (
                              <div className="text-2xl font-bold text-accent">Бесплатно</div>
                            ) : (
                              <div className="text-2xl font-bold">{item.price} ₽</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-8 border-0 shadow-md space-y-6">
                  <div className="flex gap-3">
                    <Input 
                      placeholder="Введите промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" className="px-6">Применить</Button>
                  </div>

                  <div className="border-t pt-6 space-y-3">
                    <div className="flex justify-between text-base text-muted-foreground">
                      <span>Товаров:</span>
                      <span>{cart.length}</span>
                    </div>
                    <div className="flex justify-between text-3xl font-bold">
                      <span>Итого:</span>
                      <span>{calculateTotal().toFixed(0)} ₽</span>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base py-6"
                    onClick={completePurchase}
                  >
                    Оформить заказ
                  </Button>
                  
                  <p className="text-sm text-center text-muted-foreground">
                    ⚡ Ключи будут мгновенно отправлены в вашу библиотеку
                  </p>
                </Card>
              </>
            )}
          </div>
        )}

        {activeTab === 'library' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold tracking-tight">Моя библиотека</h2>
            
            {library.length === 0 ? (
              <Card className="p-16 text-center border-0 shadow-md">
                <Icon name="Library" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground mb-6">У вас пока нет купленных игр</p>
                <Button 
                  onClick={() => setActiveTab('catalog')}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Перейти в каталог
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {library.map((item, index) => (
                  <Card key={index} className="p-6 border-0 shadow-md">
                    <div className="space-y-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-xl mb-1">{item.gameTitle}</h3>
                          <p className="text-sm text-muted-foreground">
                            Куплено: {item.purchaseDate}
                          </p>
                        </div>
                        <Badge className="bg-green-600 text-white">
                          <Icon name="CheckCircle" size={14} className="mr-1" />
                          Активирован
                        </Badge>
                      </div>
                      
                      <div className="bg-secondary p-5 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Ваш ключ активации:</p>
                            <code className="text-xl font-mono font-bold">{item.key}</code>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="ml-4"
                            onClick={() => navigator.clipboard.writeText(item.key)}
                          >
                            <Icon name="Copy" size={16} className="mr-2" />
                            Копировать
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-24 border-t border-border bg-secondary/30">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Gamepad2" size={24} className="text-foreground" />
                <span className="text-lg font-bold">GameKeys</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Лучшие цены на игровые ключи с мгновенной доставкой
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm">Покупателям</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">Как купить</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Способы оплаты</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Гарантии</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm">Поддержка</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Связаться с нами</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Политика возврата</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm">Соцсети</h4>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-center">
                  <Icon name="MessageCircle" size={18} />
                </button>
                <button className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-center">
                  <Icon name="Send" size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 GameKeys. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}