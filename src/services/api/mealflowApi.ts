import axios from "axios";
import { Ingredient } from "../../types";

const MEALFLOW_BASE_URL = ""; // Використовуємо відносний шлях для роботи через проксі
const API_KEY = "mealflow-api-key-2025-secure";

// Створюємо axios інстанс з базовою конфігурацією
const mealflowApi = axios.create({
  baseURL: MEALFLOW_BASE_URL,
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  },
});

// Інтерфейси для відповідей API
interface MappedProduct {
  id: string;
  name: string;
}

interface MapIngredientsResponse {
  products: MappedProduct[];
  metadata: {
    mapping_confidence: string;
    lang: string;
    mapped_count: number;
    total_count: number;
  };
}

interface FallbackAppResponse {
  stores: {
    store_link: string;
    deeplink: string | null;
    app_name: string;
    platform: string;
    is_partner: boolean;
    partner_priority: number;
    redirect_type: string;
  }[];
  platform: string;
  country: string;
}

// Функція для мапінгу інгредієнтів
export const mapIngredients = async (
  ingredients: Ingredient[]
): Promise<MappedProduct[]> => {
  try {
    const requestBody = {
      language: "uk",
      source_app: "mealflow-cooking-app",
      ingredients: ingredients.map((ingredient) => ({
        name: ingredient.name.toLowerCase(),
        quantity: ingredient.amount,
        unit: ingredient.unit,
      })),
    };

    const response = await mealflowApi.post<MapIngredientsResponse>(
      "/api/v1/map-ingredients",
      requestBody
    );

    return response.data.products;
  } catch (error) {
    console.error("Error mapping ingredients:", error);
    throw new Error("Не вдалося знайти інгредієнти");
  }
};

// Функція для отримання посилання на магазин
export const getStoreLink = async (): Promise<string> => {
  try {
    console.log("🔍 Отримую store_link з API...");
    const response = await mealflowApi.get<FallbackAppResponse>(
      "/api/v1/fallback-app?platform=web&country=UA"
    );
    console.log("📡 API відповідь:", response.data);
    
    // Виправляємо структуру - store_link знаходиться в stores[0]
    if (!response.data.stores || !response.data.stores[0] || !response.data.stores[0].store_link) {
      console.error("❌ store_link відсутній в API відповіді");
      throw new Error("store_link не знайдено в API відповіді");
    }
    
    const storeLink = response.data.stores[0].store_link;
    console.log("✅ store_link отримано:", storeLink);
    return storeLink;
  } catch (error) {
    console.error("💥 Помилка отримання store_link:", error);
    throw new Error("Не вдалося отримати посилання на магазин");
  }
};

// Функція для формування фінального посилання замовлення
export const generateOrderLink = async (
  ingredients: Ingredient[]
): Promise<string> => {
  try {
    console.log("🔍 Формую посилання для замовлення...");
    console.log("📦 Інгредієнти:", ingredients);
    
    // Мапимо інгредієнти
    const mappedProducts = await mapIngredients(ingredients);
    console.log("🗺️ Мапінг інгредієнтів:", mappedProducts);

    // Отримуємо посилання на магазин
    const storeLink = await getStoreLink();
    console.log("🏪 Посилання на магазин:", storeLink);

    // Формуємо параметри для URL
    const productIds = mappedProducts.map((product) => product.id).join(",");
    const productTitles = mappedProducts
      .map((product) => product.name)
      .join(",");
    
    console.log("🆔 Product IDs:", productIds);
    console.log("📝 Product Titles:", productTitles);

    // Формуємо фінальне посилання
    const orderLink = `${storeLink}?ids=${productIds}&titles=${encodeURIComponent(productTitles)}`;
    console.log("🔗 Фінальне посилання:", orderLink);

    return orderLink;
  } catch (error) {
    console.error("💥 Помилка формування посилання:", error);
    throw new Error("Не вдалося сформувати посилання для замовлення");
  }
};

export default mealflowApi;
