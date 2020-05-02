import * as $ from 'jquery';

const createAnalytics = (): object => {
    let counter: number = 0;
    let destroyed: boolean = false;

    const listener = (e): number => {
        return counter++;
    };

    $(document).on('click', listener);

    return {
        destroy(): void {
            $(document).off('click', listener);
            destroyed = true;
        },
        getClicks(): number | string {
            if (destroyed) {
                return 'Anal is destroyed';
            }
            return counter;
        }
    };
};

window['anal'] = createAnalytics;