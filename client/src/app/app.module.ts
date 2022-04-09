import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HeaderComponent } from './components/header/header.component';

import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbToastrModule,
  NbWindowModule,
  NbDialogModule,
} from '@nebular/theme';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutService } from './nbutils/layout.service';
import { AccountTemplateComponent } from './pages/account/account-template/account-template.component';
import { AccountTabComponent } from './pages/account/account-tab/account-tab.component';
import { AccountMovesTemplateComponent } from './pages/accountMoves/account-moves-template/account-moves-template.component';
import { AccountMovesFormComponent } from './pages/accountMoves/account-moves-form/account-moves-form.component';
import { AccountMovesTabComponent } from './pages/accountMoves/account-moves-tab/account-moves-tab.component';
import { CashTemplateComponent } from './pages/cash/cash-template/cash-template.component';
import { CashFormComponent } from './pages/cash/cash-form/cash-form.component';
import { CashTabComponent } from './pages/cash/cash-tab/cash-tab.component';
import { CashMovesTemplateComponent } from './pages/cashMoves/cash-moves-template/cash-moves-template.component';
import { CashMovesTabComponent } from './pages/cashMoves/cash-moves-tab/cash-moves-tab.component';
import { CashMovesFormComponent } from './pages/cashMoves/cash-moves-form/cash-moves-form.component';
import { CryptoTemplateComponent } from './pages/crypto/crypto-template/crypto-template.component';
import { CryptoTabComponent } from './pages/crypto/crypto-tab/crypto-tab.component';
import { CryptoFormComponent } from './pages/crypto/crypto-form/crypto-form.component';
import { CryptoMoveTemplateComponent } from './pages/cryptoMoves/crypto-move-template/crypto-move-template.component';
import { CryptoMoveTabComponent } from './pages/cryptoMoves/crypto-move-tab/crypto-move-tab.component';
import { CryptoMoveFormComponent } from './pages/cryptoMoves/crypto-move-form/crypto-move-form.component';
import { InvestmentTemplateComponent } from './pages/investment/investment-template/investment-template.component';
import { InvestmentFormComponent } from './pages/investment/investment-form/investment-form.component';
import { InvestmentTabComponent } from './pages/investment/investment-tab/investment-tab.component';
import { RetirementTemplateComponent } from './pages/retirement/retirement-template/retirement-template.component';
import { RetirementTabComponent } from './pages/retirement/retirement-tab/retirement-tab.component';
import { RetirementFormComponent } from './pages/retirement/retirement-form/retirement-form.component';
import { RetirementMovesTemplateComponent } from './pages/retirementMoves/retirement-moves-template/retirement-moves-template.component';
import { RetirementMovesTabComponent } from './pages/retirementMoves/retirement-moves-tab/retirement-moves-tab.component';
import { RetirementMovesFormComponent } from './pages/retirementMoves/retirement-moves-form/retirement-moves-form.component';
import { InvestmentMovesTemplateComponent } from './pages/investmentMoves/investment-moves-template/investment-moves-template.component';
import { InvestmentMovesTabComponent } from './pages/investmentMoves/investment-moves-tab/investment-moves-tab.component';
import { InvestmentMovesFormComponent } from './pages/investmentMoves/investment-moves-form/investment-moves-form.component';
import { AccountFormComponent } from './pages/account/account-form/account-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccountFormComponent,
    AccountTemplateComponent,
    AccountTabComponent,
    AccountMovesTemplateComponent,
    AccountMovesFormComponent,
    AccountMovesTabComponent,
    CashTemplateComponent,
    CashFormComponent,
    CashTabComponent,
    CashMovesTemplateComponent,
    CashMovesTabComponent,
    CashMovesFormComponent,
    CryptoTemplateComponent,
    CryptoTabComponent,
    CryptoFormComponent,
    CryptoMoveTemplateComponent,
    CryptoMoveTabComponent,
    CryptoMoveFormComponent,
    InvestmentTemplateComponent,
    InvestmentFormComponent,
    InvestmentTabComponent,
    RetirementTemplateComponent,
    RetirementTabComponent,
    RetirementFormComponent,
    RetirementMovesTemplateComponent,
    RetirementMovesTabComponent,
    RetirementMovesFormComponent,
    InvestmentMovesTemplateComponent,
    InvestmentMovesTabComponent,
    InvestmentMovesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule.forRoot(),
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
  providers: [LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
