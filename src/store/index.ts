import { useErrors } from '@/hooks/use-errors';
import { useAsset } from './Asset';
import { useCategory } from './Category';
import { useLoading } from '@/hooks/use-loading';
import { useDisplay } from '@/hooks/use-display';
import { useUser } from './User';
import { useItem } from './Item';

export default function useAppStore() {
    const assetStore = useAsset();
    const userStore = useUser();
    const categoryStore = useCategory();
    const itemStore = useItem();

    const errors = useErrors();
    const loading = useLoading();
    const display = useDisplay();

    return {
        user: userStore,
        asset: assetStore,
        category: categoryStore,
        item: useItem(),
        errors,
        loading,
        display,
    };
}
