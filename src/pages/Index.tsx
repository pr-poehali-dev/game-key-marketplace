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
      <header className="sticky top-0 z-50 bg-steam-card border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Icon name="Gamepad2" size={32} className="text-primary" />
                <span className="text-2xl font-bold text-primary">GameKeys</span>
              </div>
              
              <nav className="hidden md:flex items-center gap-1">
                <Button 
                  variant={activeTab === 'home' ? 'default' : 'ghost'} 
                  onClick={() => setActiveTab('home')}
                  className="text-sm"
                >
                  Главная
                </Button>
                <Button 
                  variant={activeTab === 'catalog' ? 'default' : 'ghost'} 
                  onClick={() => setActiveTab('catalog')}
                  className="text-sm"
                >
                  Каталог
                </Button>
                <Button 
                  variant={activeTab === 'library' ? 'default' : 'ghost'} 
                  onClick={() => setActiveTab('library')}
                  className="text-sm"
                >
                  Моя библиотека
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="relative"
                onClick={() => setActiveTab('cart')}
              >
                <Icon name="ShoppingCart" size={20} />
                {cartTotal > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
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
          <div className="space-y-8 animate-fade-in">
            <section className="relative h-[400px] rounded-lg overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${GAMES[0].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-center px-12 space-y-4">
                <Badge className="w-fit bg-destructive text-destructive-foreground">
                  Скидка -50%
                </Badge>
                <h1 className="text-5xl font-bold max-w-xl">
                  {GAMES[0].title}
                </h1>
                <p className="text-muted-foreground max-w-lg text-lg">
                  Легендарная RPG с глубоким геймплеем и атмосферным миром
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {(GAMES[0].price * (1 - GAMES[0].discount / 100)).toFixed(0)} ₽
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      {GAMES[0].price} ₽
                    </span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="w-fit"
                  onClick={() => addToCart(GAMES[0])}
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Купить
                </Button>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">🔥 Специальные предложения</h2>
                <Button variant="ghost" onClick={() => setActiveTab('catalog')}>
                  Смотреть все
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {GAMES.map(game => (
                  <Card 
                    key={game.id} 
                    className="overflow-hidden group cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl hover:border-primary/50"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      {game.discount > 0 && (
                        <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                          -{game.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg line-clamp-1">{game.title}</h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Icon name="Star" size={16} />
                          <span className="text-sm font-medium">{game.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{game.genre}</Badge>
                        <div className="flex gap-1">
                          {game.platforms.map(platform => (
                            <Icon 
                              key={platform} 
                              name={platform === 'windows' ? 'Monitor' : platform === 'mac' ? 'Apple' : 'Box'} 
                              size={16}
                              className="text-muted-foreground"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          {game.discount > 0 ? (
                            <>
                              <span className="text-2xl font-bold text-primary">
                                {(game.price * (1 - game.discount / 100)).toFixed(0)} ₽
                              </span>
                              <span className="text-sm text-muted-foreground line-through">
                                {game.price} ₽
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold">{game.price} ₽</span>
                          )}
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => addToCart(game)}
                        >
                          <Icon name="ShoppingCart" size={16} />
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
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Каталог игр</h2>
              <div className="flex gap-2">
                <Button 
                  variant={selectedGenre === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedGenre('all')}
                >
                  Все
                </Button>
                <Button 
                  variant={selectedGenre === 'RPG' ? 'default' : 'outline'}
                  onClick={() => setSelectedGenre('RPG')}
                >
                  RPG
                </Button>
                <Button 
                  variant={selectedGenre === 'Action' ? 'default' : 'outline'}
                  onClick={() => setSelectedGenre('Action')}
                >
                  Action
                </Button>
                <Button 
                  variant={selectedGenre === 'Adventure' ? 'default' : 'outline'}
                  onClick={() => setSelectedGenre('Adventure')}
                >
                  Adventure
                </Button>
                <Button 
                  variant={selectedGenre === 'Simulation' ? 'default' : 'outline'}
                  onClick={() => setSelectedGenre('Simulation')}
                >
                  Simulation
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <Card 
                  key={game.id} 
                  className="overflow-hidden group cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl hover:border-primary/50"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    {game.discount > 0 && (
                      <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                        -{game.discount}%
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg line-clamp-1">{game.title}</h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Icon name="Star" size={16} />
                        <span className="text-sm font-medium">{game.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{game.genre}</Badge>
                      <div className="flex gap-1">
                        {game.platforms.map(platform => (
                          <Icon 
                            key={platform} 
                            name={platform === 'windows' ? 'Monitor' : platform === 'mac' ? 'Apple' : 'Box'} 
                            size={16}
                            className="text-muted-foreground"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        {game.discount > 0 ? (
                          <>
                            <span className="text-2xl font-bold text-primary">
                              {(game.price * (1 - game.discount / 100)).toFixed(0)} ₽
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              {game.price} ₽
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold">{game.price} ₽</span>
                        )}
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => addToCart(game)}
                      >
                        <Icon name="ShoppingCart" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Корзина покупок</h2>
            
            {cart.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground mb-4">Корзина пуста</p>
                <Button onClick={() => setActiveTab('catalog')}>
                  Перейти в каталог
                </Button>
              </Card>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map(item => (
                    <Card key={item.id} className="p-4">
                      <div className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-32 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">{item.genre}</Badge>
                            {item.discount > 0 && (
                              <Badge className="bg-destructive text-destructive-foreground">
                                -{item.discount}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="X" size={20} />
                          </Button>
                          <div className="text-right">
                            {item.discount > 0 ? (
                              <>
                                <div className="text-2xl font-bold text-primary">
                                  {(item.price * (1 - item.discount / 100)).toFixed(0)} ₽
                                </div>
                                <div className="text-sm text-muted-foreground line-through">
                                  {item.price} ₽
                                </div>
                              </>
                            ) : (
                              <div className="text-2xl font-bold">{item.price} ₽</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-6 space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Введите промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline">Применить</Button>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-lg">
                      <span className="text-muted-foreground">Товаров:</span>
                      <span>{cart.length}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Итого:</span>
                      <span className="text-primary">{calculateTotal().toFixed(0)} ₽</span>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={completePurchase}
                  >
                    <Icon name="CreditCard" size={20} className="mr-2" />
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
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Моя библиотека ключей</h2>
            
            {library.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="Library" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground mb-4">У вас пока нет купленных игр</p>
                <Button onClick={() => setActiveTab('catalog')}>
                  Перейти в каталог
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {library.map((item, index) => (
                  <Card key={index} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-xl">{item.gameTitle}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Куплено: {item.purchaseDate}
                          </p>
                        </div>
                        <Badge className="bg-green-600">
                          <Icon name="CheckCircle" size={14} className="mr-1" />
                          Активирован
                        </Badge>
                      </div>
                      
                      <div className="bg-secondary/50 p-4 rounded border border-primary/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Ваш ключ активации:</p>
                            <code className="text-lg font-mono font-bold text-primary">{item.key}</code>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
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

      <footer className="mt-16 border-t border-border bg-steam-card">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Gamepad2" size={28} className="text-primary" />
                <span className="text-xl font-bold text-primary">GameKeys</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Лучшие цены на игровые ключи с мгновенной доставкой
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Как купить</li>
                <li>Способы оплаты</li>
                <li>Гарантии</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>FAQ</li>
                <li>Связаться с нами</li>
                <li>Политика возврата</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Соцсети</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="icon">
                  <Icon name="MessageCircle" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 GameKeys. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}