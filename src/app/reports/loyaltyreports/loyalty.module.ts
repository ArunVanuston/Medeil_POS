import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CustloyaltypointsComponent } from './custloyaltypoints/custloyaltypoints.component';
import { GiftcardsalecurdateComponent } from './giftcardsalecurdate/giftcardsalecurdate.component';
import { GiftcardsalemonthComponent } from './giftcardsalemonth/giftcardsalemonth.component';
import { LayaltysalescurdateComponent } from './layaltysalescurdate/layaltysalescurdate.component';
import { LoyatyRouting } from './loyalty.routing';
import { LoyaltyService } from './loyalty.service';
import { LoyaltycustomersComponent } from './loyaltycustomers/loyaltycustomers.component';
import { LoyaltysalemonthComponent } from './loyaltysalemonth/loyaltysalemonth.component';


@NgModule({
    imports:[
        CommonModule,
        SharedModule,
        RouterModule.forChild(LoyatyRouting)
    ],
    declarations:[
        LoyaltycustomersComponent,
        LayaltysalescurdateComponent,
        LoyaltycustomersComponent,
        LoyaltysalemonthComponent,
        GiftcardsalecurdateComponent,
        GiftcardsalemonthComponent,
        CustloyaltypointsComponent
    ],
    providers:[
        LoyaltyService
    ]
})

export class LoyaltyModule{
    
}