import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import axios from 'axios';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    results: [],
    page: 1,
    isLoading: false,
    showModal: false,
    modalImg: '',
  };

  async fetchData(search, page) {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${search
        .split(' ')
        .join(
          '+'
        )}&page=${page}&key=30059252-fce911be355cbdd889b3b7d8d&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data.hits.map(img => {
      return {
        id: img.id,
        webformatURL: img.webformatURL,
        largeImageURL: img.largeImageURL,
      };
    });
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  async componentDidUpdate() {
    if (this.state.search && this.state.page === 1 && !this.state.isLoading) {
      this.setState({ isLoading: true });
      this.setState({
        results: await this.fetchData(this.state.search, this.state.page),
      });
      this.setState({ isLoading: false });
      this.setState(prev => {
        return {
          page: prev.page + 1,
        };
      });
    }
  }

  showModal = link => {
    this.setState({ modalImg: link });
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.closeModal();
    }
  };

  onSubmitSearch = search => {
    this.setState({ page: 1 });
    this.setState({ search });
  };

  async loadMore() {
    this.setState({ isLoading: true });
    const fetchedData = await this.fetchData(
      this.state.search,
      this.state.page
    );
    this.setState(prev => {
      return {
        page: prev.page + 1,
      };
    });
    this.setState(prev => {
      return { results: [...prev.results, ...fetchedData] };
    });
    this.setState({ isLoading: false });
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
            <Button onLoadMore={this.loadMore.bind(this)} />
          </>
        )}
      </>
    );
  }
}
