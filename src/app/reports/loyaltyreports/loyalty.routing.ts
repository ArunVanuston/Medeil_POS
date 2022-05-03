import { Routes } from '@angular/router';
import { CustloyaltypointsComponent } from './custloyaltypoints/custloyaltypoints.component';
import { GiftcardsalecurdateComponent } from './giftcardsalecurdate/giftcardsalecurdate.component';
import { GiftcardsalemonthComponent } from './giftcardsalemonth/giftcardsalemonth.component';
import { LayaltysalescurdateComponent } from './layaltysalescurdate/layaltysalescurdate.component';
import { LoyaltycustomersComponent } from './loyaltycustomers/loyaltycustomers.component';
import { LoyaltysalemonthComponent } from './loyaltysalemonth/loyaltysalemonth.component';
export const LoyatyRouting: Routes = [{
    path: '',
    children: [
        {
            path: 'LoyaltyCustList',
            component: LoyaltycustomersComponent,
            data: {
                breadcrumb: 'Loyalty Customer'
            }
        },
        {
            path: 'LoyaltyPoints',
            component: CustloyaltypointsComponent,
            data: {
                breadcrumb: 'Customer Loyalty Points'
            }
        },
        {
            path: 'TodayGiftcardSale',
            component: GiftcardsalecurdateComponent,
            data: {
                breadcrumb: 'Giftcard Sale Points'
            }
        }, {
            path: 'MonthlyGiftcardSale',
            component: GiftcardsalemonthComponent,
            data: {
                breadcrumb: 'Giftcard Sale Points'
            }
        },
        {
            path: 'TodayLoyaltySale',
            component: LayaltysalescurdateComponent,
            data: {
                breadcrumb: 'Today Loyalty Sales'

            }
        },
        {
            path: 'MonthlyLoyaltySales',
            component: LoyaltysalemonthComponent,
            data: {
                breadcrumb: 'Monthly Loyalty Sales'

            }
        }
    ]

}]