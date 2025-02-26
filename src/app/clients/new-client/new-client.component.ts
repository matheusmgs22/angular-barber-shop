import { Component, Inject, OnDestroy } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ICLientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientFormComponent } from "../components/client-form/client-form.component";
import { Subscription } from 'rxjs';
import { ClientModelForm } from '../client.models';

@Component({
  selector: 'app-new-client',
  imports: [ClientFormComponent],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService }
  ]
})
export class NewClientComponent implements OnDestroy {
[x: string]: any;

  private httpSubscription?: Subscription

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: ICLientService) { }


    ngOnDestroy(): void {
      if (this.httpSubscription) {
        this.httpSubscription.unsubscribe()
      }
    }

    onSubmitClient(value: ClientModelForm) {
      const { id, ...request } = value
      this.httpSubscription = this.httpService.save(request).subscribe(_ => {
      })
    }
}
