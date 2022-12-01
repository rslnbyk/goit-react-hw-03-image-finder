import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import { fetchData } from 'services/api';

export class App extends Component {
  state = {
    search: '',
    results: [],
    page: 1,
    isLoading: false,
    showModal: false,
    modalImg: '',
  };

  async componentDidUpdate(_, prevState) {
    const { page, search } = this.state;
    if (prevState.page !== page || prevState.search !== search) {
      this.setState({ isLoading: true });
      try {
        const results = await fetchData(search, page);
        this.setState(prev => {
          return { results: [...prev.results, ...results] };
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  showModal = link => {
    this.setState({ modalImg: link, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onSubmitSearch = search => {
    this.setState({ page: 1, search, results: [] });
  };

  async loadMore() {
    this.setState(prev => {
      return {
        page: prev.page + 1,
      };
    });
  }

  render() {
    return (
      <>
        <SearchBar onSubmit={this.onSubmitSearch} />
        {this.state.showModal && (
          <Modal imageLink={this.state.modalImg} closeModal={this.closeModal} />
        )}
        {this.state.isLoading && this.state.page === 1 && (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        )}
        {this.state.isLoading && this.state.page > 1 && (
          <>
            <ImageGallery
              images={this.state.results}
              openModal={this.showModal}
            />
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </>
        )}
        {!this.state.isLoading && this.state.results.length > 0 && (
          <>
            <ImageGallery
              images={this.state.results}
              openModal={this.showModal}
            />
            {this.state.page !== 42 && (
              <Button onLoadMore={this.loadMore.bind(this)} />
            )}
          </>
        )}
      </>
    );
  }
}
