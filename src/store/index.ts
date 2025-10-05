import { useErrors } from '@/hooks/use-errors';
import { useAsset } from './Asset';
import { useCategory } from './Category';
import { useUser } from './user';
import { useLoading } from '@/hooks/use-loading';
import { useDisplay } from '@/hooks/use-display';

export default function useAppStore() {
    const assetStore = useAsset();
    const userStore = useUser();
    const categoryStore = useCategory();
   

    const errors = useErrors();
    const loading = useLoading();
    const display = useDisplay();

    return {
        user: userStore,
        asset: assetStore,
        category: categoryStore,
        errors,
        loading,
        display,
    };
}
