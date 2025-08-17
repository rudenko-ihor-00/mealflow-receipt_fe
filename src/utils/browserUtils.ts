/**
 * Утиліти для роботи з браузером та обходу обмежень
 */

/**
 * Безпечно відкриває посилання, обходячи блокування браузерів
 * @param url - URL для відкриття
 * @param target - Ціль (_blank, _self, тощо)
 * @param fallbackToCurrent - Чи перенаправляти в поточній вкладці якщо не вдалося відкрити нову
 */
export const safeOpenUrl = (
  url: string, 
  target: string = "_blank", 
  fallbackToCurrent: boolean = true
): boolean => {
  try {
    // Спробуємо відкрити в новій вкладці
    const newWindow = window.open(url, target);
    
    // Перевіряємо, чи браузер заблокував відкриття
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      console.log("⚠️ Браузер заблокував нову вкладку");
      
      if (fallbackToCurrent) {
        console.log("🔄 Перенаправляємо в поточній вкладці");
        window.location.href = url;
        return true;
      }
      return false;
    }
    
    // Фокусуємося на новій вкладці
    newWindow.focus();
    return true;
    
  } catch (error) {
    console.error("💥 Помилка відкриття посилання:", error);
    
    if (fallbackToCurrent) {
      console.log("🔄 Fallback: перенаправляємо в поточній вкладці");
      window.location.href = url;
      return true;
    }
    return false;
  }
};

/**
 * Відкриває посилання з попередженням користувача про можливе блокування
 * @param url - URL для відкриття
 * @param message - Повідомлення для користувача
 */
export const openUrlWithWarning = (url: string, message?: string): void => {
  const defaultMessage = "Якщо посилання не відкрилося, натисніть на нього ще раз або скопіюйте в нову вкладку.";
  
  // Показуємо попередження
  if (message || defaultMessage) {
    alert(message || defaultMessage);
  }
  
  // Спробуємо відкрити
  const success = safeOpenUrl(url, "_blank", true);
  
  if (!success) {
    // Якщо не вдалося, показуємо URL для копіювання
    const copyMessage = `Посилання: ${url}\n\nСкопіюйте це посилання та відкрийте в новій вкладці.`;
    alert(copyMessage);
  }
};

/**
 * Перевіряє, чи браузер підтримує автоматичне відкриття нових вкладок
 */
export const canOpenNewTabs = (): boolean => {
  try {
    const testWindow = window.open("about:blank", "_blank");
    if (testWindow) {
      testWindow.close();
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
