import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavVisibilityStore {
  private state = signal(false);

  isVisible = computed(() => this.state());

  toggle() {
    this.state.update(visible => !visible);
  }

  close(){
    this.state.set(false);
  }
}
