export const tg = window.Telegram?.WebApp as any;
console.log(tg)
export const user = tg?.initDataUnsafe?.user;

export const initTelegram = () => {
  if (tg) {
    tg.ready();
  }
};